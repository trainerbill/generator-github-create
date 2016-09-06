import { Base } from 'yeoman-generator';
import * as github from '../shared/github';
import * as shell from '../shared/shell';
import merge from 'lodash.merge';

class GithubAuthenticateGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.option('debug', {
      type: String,
      defaults: false,
      alias: 'd',
      desc: 'GitHubAPI Debug'
    });

    this.option('host', {
      type: String,
      defaults: 'api.github.com',
      alias: 'h',
      desc: 'Github Host'
    });

    this.option('protocol', {
      type: String,
      defaults: 'https',
      alias: 'p',
      desc: 'Github Protocol'
    });

    this.option('path', {
      type: String,
      defaults: '',
      alias: 'q',
      desc: 'Github Path:  for some GHEs; none for GitHub.com'
    });

    this.option('twofactor', {
      type: String,
      defaults: undefined,
      alias: 't',
      desc: 'Enable 2 factor authentication'
    });

    this.option('scopes', {
      type: String,
      defaults: 'user,public_repo,repo,repo:status',
      alias: 's',
      desc: 'Comma separated list for github authorization scopes'
    });

    this.option('username', {
      type: String,
      alias: 'u',
      desc: 'Github Username'
    });

    this.option('appName', {
      type: String,
      alias: 'n',
      defaults: 'generator-github-create',
      desc: 'App Name for Github Authorization'
    });

    this.option('appUrl', {
      type: String,
      alias: 'o',
      defaults: 'https://github.com/trainerbill/generator-github-create',
      desc: 'App URL for Github Authorization'
    });

  }

  initializing() {

    let config = {
      twofactor: this.options.twofactor,
      github: {
        debug: this.options.debug,
        host: this.options.host,
        protocol: this.options.protocol,
        pathPrefix: this.options.path || '/',
        headers: {
          'user-agent': this.options.appName
        },
        scopes: this.options.scopes.trim(this.options.scopes.split(','))
      },
      username: this.options.username,
      appName: this.options.appName,
      appUrl: this.options.appUrl
    };

    return shell.getUsername()
      .then(username => {
        if (!config.username) {
          config.username = username;
        }

        return config;
      })
      .then(config => this.config.set('authenticate', config))
      .then(github.get() || github.init(config.github))
      .then(() => {
        return [
          {
            name    : 'username',
            message : 'Github Username',
            default: config.username
          },
          {
            when: (answers) => { return answers.username !== config.username; },
            type: 'confirm',
            name: 'saveuser',
            message: 'Save username to git config?  Will make generation faster next time',
            default: 'Y'
          },
          {
            type    : 'password',
            name    : 'password',
            message : 'Github Password'
          },
          {
            type: 'confirm',
            name    : 'twofactor',
            message : 'Use two factor authentication?',
            default: config.twofactor || false
          },
          {
            when: (answers) => { return answers.twofactor; },
            name    : 'twofactorcode',
            message : 'Two Factor Code'
          }
        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.password = answers.password;
        this.twofactorcode = answers.twofactorcode;
        delete answers.password;
        delete answers.twofactorcode;
        this.config.set('authenticate', merge(this.config.get('authenticate'), answers));

        if(answers.saveuser) {
          shell.saveUsername(answers.username);
        }
      })
      .then(() => github.authenticate(config.username, this.password))
      .then(() => github.getAuthorization(config, this.twofactorcode))
      .then(authorization => github.deleteAuthorization(authorization))
      .then(() => github.createAuthorization(config))
      .then(() => {
        this.config.save();
      });
  }

}

module.exports = GithubAuthenticateGenerator;
