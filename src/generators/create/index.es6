import { Base } from 'yeoman-generator';
import * as github from '../shared/github';
import * as shell from '../shared/shell';
import merge from 'lodash.merge';
import find from 'lodash.find';
import defaults from 'lodash.defaults';
import path from 'path';

class GitCreateGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.option('username', {
      type: String,
      alias: 'u',
      desc: 'Github Username. Creates the repository on the user'
    });

    this.option('init', {
      type: String,
      alias: 'i',
      desc: 'initialize local git'
    });

    this.option('push', {
      type: String,
      alias: 'p',
      desc: 'initial commit and push repository'
    });

    this.option('org', {
      type: String,
      alias: 'o',
      desc: 'Organization. Creates the repository on the org not the user'
    });

    this.option('name', {
      type: String,
      alias: 'n',
      desc: 'Repository Name'
      //defaults: path.basename(process.cwd())
    });

    this.option('description', {
      type: String,
      alias: 'd',
      desc: 'Repository Description',
    });

    this.option('private', {
      type: String,
      alias: 'a',
      desc: 'Repository Access.  private|public',
    });

  }

  initializing() {
    //Authenticate Github API
    /* istanbul ignore if */
    if (!github.get()) {
      this.log('You must use the authenticate generator first... Exiting');
      process.exit(1);
    }

    //Initialize defaults
    this.options = defaults(this.options, this.config.get('create'), {
      name: path.basename(process.cwd()),
      description: 'Repository generated with generator-github-create',
      private: false,
      username: this.config.get('authenticate') ? this.config.get('authenticate').username : undefined,
      init: true,
      push: true
    });

    return github.getOrgs()
      .then(orgs => {
        let choices = orgs.map(function(item) { return item.login; });
        return [
          {
            when: (answers) => { return orgs.length; },
            type    : 'confirm',
            name    : 'useOrg',
            message : 'Will this repository be part of an organization you belong to?',
            default : this.options.useOrg
          },
          {
            when: (answers) => { return answers.useOrg; },
            type: 'list',
            name: 'org',
            default: this.options.org,
            message: 'Select your organization',
            choices: choices
          }
        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.config.set('create', answers);
      })
      .then(() => github.getRepos(this.options))
      .then(repos => {
        return [
          {
            name: 'name',
            message: 'Repository Name',
            validate: (input) => { /* istanbul ignore next: no idea how to test validate */ return ((find(repos, { name: input })) ? input + ' repository exists.' : true); },
            default: this.options.name
          },
          {
            name: 'description',
            message: 'Repository Description',
            default: this.options.description
          },
          {
            type: 'list',
            name: 'private',
            message: 'Access',
            default: this.options.private,
            choices: [
              {
                name: 'Public',
                value: false
              },
              {
                name: 'Private - You have to pay for this',
                value: true
              }
            ]
          },

        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.config.set('create', merge(this.config.get('create'), answers));
      })
      .then(() => {
        /* istanbul ignore next: no need to test this */
        if (this.fs.exists('.git/config')) {
          this.log('Skipping Git Init:  Git is already initialized in this directoy.  You need to delete the .git folder before you can initialize and push this repository.');
          return [];
        }
        return [
          {
            type: 'confirm',
            name: 'init',
            message: 'Initialize Local Git?',
            default: this.options.init
          },
          {
            when: (answers) => { return answers.init; },
            type: 'confirm',
            name: 'push',
            message: 'Push initial commit?',
            default: this.options.push
          }
        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.config.set('create', merge(this.config.get('create'), answers));
      });
  }

  configuring() {
    return this.config.save();
  }

  default() {
    let config = this.config.get('create');

    return github.createRepository(config)
      .then(repo => {
        this.config.set('create', merge(this.config.get('create'), { urls: [ repo.html_url, repo.ssh_url, repo.clone_url ] }));
        this.config.save();
      })
      .then(() => {
        if (config.init) {
          return shell.gitInit()
            .then(() => shell.gitRemote(config));
        }
      });
  }

  writing() {
    let config = this.config.get('create');
    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    /* istanbul ignore next: no need to test this */
    if (!pkg) {
      pkg = this.fs.readJSON(this.fs.writeJSON(this.destinationPath('package.json'), {}));
    }

    pkg.repository = {
      type: 'git',
      url: config.urls[1]
    };
    pkg.bugs = {
      url: config.urls[0] + '/issues'
    };
    pkg.homepage = config.urls[0] + '#readme';
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

  }

  install() {
    if (this.config.get('create').push) {
      return shell.gitCommit()
        .then(() => shell.gitPush());
    }
  }

}

module.exports = GitCreateGenerator;
