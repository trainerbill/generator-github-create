import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import * as prompts from './prompts';
import * as shell from '../shared/shell';
import logger from '../shared/logger';
import merge from 'lodash.merge';

class GithubGitGenerator extends Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('remoteUrl', {
      required: false,
      desc: 'Remote Url'
    });

  }

  initializing() {
    logger.debug('Git::Initializing::Start');
    this.config.set('git', {
      init: true,
      url: this.options.remoteUrl || this.config.get(),
      repository: this.config.get('repository')
    });
    logger.debug('Git::Initializing::End');
  }

  prompting() {
    logger.debug('Git::Prompting::Start');
    return this.prompt(prompts.git(this.config.get('git')))
      .then(answers => {
        this.config.set('git', merge(this.config.get('git'), answers));
        logger.debug('Git::Prompting::End');
      });
  }

  configuring() {
    logger.debug('Git::Configuring::Start');
    this.config.save();
    logger.debug('Git::Configuring::End');
  }

  install() {
    logger.debug('Git::Install::Start');
    return shell.gitInit(this.config.get('git'))
      .then(() => shell.gitRemote(this.config.get('git')))
      .then(() => shell.gitPull(this.config.get('git')))
      .then(() => shell.gitPull(this.config.get('git')))
      .then(() => {
        logger.debug('Git::Install::End');
      });
  }

}

module.exports = GithubGitGenerator;
