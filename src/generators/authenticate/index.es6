import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import * as prompts from './prompts';
import * as github from '../shared/github';
import * as shell from '../shared/shell';
import logger from '../shared/logger';

class GithubAuthenticateGenerator extends Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('GitHubAPI', {
      required: false,
      defaults: {},
      desc: 'GitHubAPI Configuration'
    });

    //Options
    this.option('username', {
      required: false,
      desc: 'Github Username'
    });

    //Options
    this.option('appName', {
      required: true,
      defaults: '@modern-mean/generator-git',
      desc: 'App Name for Github Authorization'
    });

    //Options
    this.option('appUrl', {
      required: true,
      defaults: 'https://github.com/modern-mean/generator-git',
      desc: 'App URL for Github Authorization'
    });



  }

  initializing() {
    logger.debug('Authenticate::Initializing::Start');
    //Initialize Github API
    github.get() || github.init(this.options.GitHubAPI);

    //Initialize Config
    this.config.set('authenticate', {
      username: shell.getUsername()
    });

    return this.prompt(prompts.authentication(this.config.get('authenticate').username))
      .then(answers => {
        this.config.get('authenticate').username = answers.username;
        this.password = answers.password;
        if(answers.save) {
          shell.saveUsername(answers.username);
        }
      })
      .then(() => github.authenticate(this.config.get('authenticate').username, this.password))
      .then(() => github.getAuthorization(this.options.appName))
      .then(authorization => github.deleteAuthorization(authorization))
      .then(() => github.createAuthorization(this.options.appName, this.options.appUrl))
      .then(() => {
        this.config.save();
        logger.debug('Authenticate::Initializing::End');
      });
  }

  install() {
    logger.debug('Authenticate::Install::Start');
  }

}

module.exports = GithubAuthenticateGenerator;
