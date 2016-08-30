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
    logger.debug("Git::Initializing::Start");
    this.config.set('git', {
      init: true,
      remote: true,
      url: this.options.remoteUrl || this.config.get(),
      repository: this.config.get('repository')
    });
  }

  prompting() {
    logger.debug("Git::Prompting::Start");
    return this.prompt(prompts.git(this.config.get('git')))
      .then(answers => {
        this.config.set('git', merge(this.config.get('git'), answers));
      });
  }

  configuring() {
    logger.debug("Git::Configuring::Start");
    this.config.save();
  }

  install() {
    return shell.gitInit(this.config.get('git'))
      .then(() => shell.gitRemote(this.config.get('git')))
      .then(() => shell.gitPull(this.config.get('git')))
      .then(() => shell.gitPull(this.config.get('git')));
  }

}

module.exports = GithubGitGenerator;
