import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import * as prompts from './prompts';
import * as github from '../shared/github';
import logger from '../shared/logger';
import merge from 'lodash.merge';
import find from 'lodash.find';

class GitCreateGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    logger.debug('Create::Initializing::Start');
    this.tempConfig = {};
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }

    if(!this.config.get('orgs')) {
      this.config.set('orgs', {});
    }
    logger.debug('Create::Initializing::End');
  }

  prompting() {
    logger.debug('Create::Prompting::Start');
    return github.getRepos(this.config.get('authenticate'), this.config.get('orgs'))
      .then(repos => this.prompt(prompts.repository(repos)))
      .then(answers => {
        this.tempConfig = merge(this.tempConfig, answers);
      })
      .then(() => {
        this.config.set('create', this.tempConfig);
        logger.debug('Create::Prompting::End', this.config.get('create'));
      });
  }

  configuring() {
    logger.debug('Create::Configuring::Start');
    this.config.save();
    logger.debug('Create::Configuring::End');
  }

  install() {
    logger.debug('Create::Install::Start');
    return github.createRepository(this.config.get('create'), this.config.get('orgs'))
      .then(repo => {
        this.config.set(merge(this.config.get('create'), { repository: { http_url: repo.html_url, ssh_url: repo.ssh_url } }));
        this.config.save();
        logger.debug('Create::Install::End');
      });
  }

}

module.exports = GitCreateGenerator;
