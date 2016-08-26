'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitGenerator extends _yeomanGenerator.Base {

  constructor(...args) {

    super(...args);

    this.github = new _github2.default({});

    this.answers = {};
    this.config = {
      authorization: {
        name: '@modern-mean/generator-git',
        current: undefined,
        token: undefined
      },
      repository: {
        name: undefined
      }
    };

    this.prompts = {
      search: [{
        when: answers => {
          return answers.userSelect === 'Other';
        },
        name: 'username',
        message: 'Github Username'
      }],
      authenticate: [{
        type: 'password',
        name: 'githubPassword',
        message: 'Github Password'
      }],
      authorization: [{
        when: answers => {
          return answers.fulltoken;
        },
        name: 'token',
        message: 'Enter your full token'
      }, {
        when: answers => {
          return !answers.fulltoken;
        },
        type: 'confirm',
        name: 'delete',
        message: 'In order to proceed we need to delete the old authorization and create a new one.  This should not mess anything up.  Proceed?',
        default: 'Y'
      }],
      orgs: [{
        type: 'confirm',
        name: 'isOrg',
        message: 'Will this repository be part of an organization you belong to?'
      }],
      repoInfo: [{
        name: 'name',
        message: 'Repository Name'
      }, {
        name: 'description',
        message: 'Repository Description'
      }, {
        type: 'list',
        name: 'private',
        message: 'Access',
        choices: [{
          name: 'Public',
          value: false
        }, {
          name: 'Private - You have to pay for this',
          value: true
        }]
      }, {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: [{
          name: 'ISC',
          value: 'isc'
        }, {
          name: 'MIT',
          value: 'mit'
        }, {
          name: 'Apache',
          value: 'apache'
        }]

      }]
    };
  }

  searchUsers() {
    if (!this.user.git.email()) {
      console.log(_chalk2.default.red('Cannot find git email.  You should set: git config --global user.email "your_email@example.com" '));
    }
    return this.github.search.users({ q: this.user.git.email() + ' in:email' }).then(user => {
      user.items.push({ login: 'testy' });
      user.total_count = 2;
      if (user.total_count === 1) {
        this.config.user = user.items[0];
      } else if (user.total_count > 1) {
        let choices = user.items.map(function (item) {
          return { name: item['login'], value: user.items.indexOf(item) };
        });
        choices.push('Other');
        this.prompts.search.unshift({
          type: 'list',
          name: 'userSelect',
          message: 'We found multiple github accounts for this ' + this.user.git.email() + '.  Select your github account.',
          choices: choices
        });
        return this.prompt(this.prompts.search).then(answers => {
          if (answers.username) {
            this.config.username = answers.username;
          } else {
            this.config.user = user.items[answers.userSelect];
            this.config.username = user.items[answers.userSelect].login;
          }
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  authorization() {
    return new Promise((resolve, reject) => {
      this.prompt(this.prompts.authenticate).then(answers => {
        this.config.password = answers.githubPassword;
      }).then(() => {

        this.github.authenticate({
          type: 'basic',
          username: this.config.username,
          password: this.config.password
        });

        return this.github.authorization.getAll({
          page: '1',
          per_page: '100'
        }, (err, auths) => {
          this.config.authorization.current = (0, _lodash.find)(auths, { app: { name: this.config.authorization.name } }) || undefined;
          if (this.config.authorization.current) {
            this.prompts.authorization.unshift({
              type: 'confirm',
              name: 'fulltoken',
              message: 'You already have an authorization on your github account for ' + this.config.authorization.name + ' and the last 8 digits of the token are ' + this.config.authorization.current.token_last_eight + '.  Do you have the full token?'
            });
            this.prompt(this.prompts.authorization).then(answers => {
              if (answers.token) {
                this.config.authorization.token = answers.token;
                return resolve();
              } else {
                this.github.authorization.delete({ id: this.config.authorization.current.id }, (err, res) => {
                  if (err) {
                    return reject(err);
                  }
                  return resolve();
                });
              }
            });
          } else {
            return resolve();
          }
        });
      });
    });
  }

  createAuthorization() {
    return new Promise((resolve, reject) => {

      this.github.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: this.config.authorization.name,
        note_url: 'https://github.com/modern-mean/generator-git',
        headers: {
          'X-GitHub-OTP': 'two-factor-code'
        }
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        this.config.authorization.token = res.token;
        return resolve();
      });
    });
  }

  githubOrgs() {
    return new Promise((resolve, reject) => {
      this.github.users.getOrgs({
        page: '1',
        per_page: '100'
      }, (err, orgs) => {
        if (err) {
          return reject(err);
        }

        //Add org prompt if user is part of an organziation
        if (orgs.length > 0) {
          let choices = orgs.map(function (item) {
            return { name: item['login'], value: orgs.indexOf(item) };
          });
          this.prompts.orgs.push({
            when: answers => {
              return answers.isOrg;
            },
            type: 'list',
            name: 'orgSelect',
            message: 'Select your organization',
            choices: choices
          });

          this.prompt(this.prompts.orgs).then(answers => {
            if (answers.isOrg) {
              this.config.org = orgs[answers.orgSelect];
            }
            return resolve(orgs);
          });
        } else {
          return resolve();
        }
      });
    });
  }

  getRepos() {
    return new Promise((resolve, reject) => {
      if (this.config.org) {
        this.github.repos.getForOrg({ org: this.config.org.login, page: '1', per_page: '100' }, (err, res) => {
          if (err) {
            return reject(err);
          }
          this.config.repos = res;
          return resolve();
        });
      } else {
        this.github.repos.getForUser({ user: this.config.username, page: '1', per_page: '100' }, (err, res) => {
          if (err) {
            return reject(err);
          }
          this.config.repos = res;
          return resolve();
        });
      }
    });
  }

  repoInfo() {
    return new Promise((resolve, reject) => {
      this.prompt(this.prompts.repoInfo).then(answers => {
        let repository = (0, _lodash.find)(this.config.repos, { name: answers.name });
        if (repository) {
          console.log(_chalk2.default.bold.red('Repository already exists!'));
          return reject('Repository already exists!');
        }
        this.repoAnswers = answers;
        return resolve();
      });
    });
  }

  createRepo() {
    return new Promise((resolve, reject) => {
      this.prompt([{
        type: 'confirm',
        name: 'create',
        message: 'Create the following Repo?  name: ' + this.repoAnswers.name + (this.config.org ? 'org: ' + this.config.org.login : 'user: ' + this.config.username)
      }]).then(answers => {
        if (!answers.create) {
          return reject('User decided not to create repository');
        }
        if (this.config.org) {
          this.github.repos.createForOrg({
            org: this.config.org.login,
            name: this.repoAnswers.name,
            description: this.repoAnswers.description,
            private: this.repoAnswers.private,
            license_template: this.repoAnswers.license,
            auto_init: true
          }, (err, res) => {
            if (err) {
              return reject(err);
            }
            this.config.repository = res;
            return resolve();
          });
        } else {
          this.github.repos.create({
            name: this.repoAnswers.name,
            description: this.repoAnswers.description,
            private: this.repoAnswers.private,
            license_template: this.repoAnswers.license,
            auto_init: true
          }, (err, res) => {
            if (err) {
              return reject(err);
            }
            this.config.repository = res;
            return resolve();
          });
        }
      });
    });
  }

}

module.exports = GitGenerator;