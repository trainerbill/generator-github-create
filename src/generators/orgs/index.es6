import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import * as prompts from './prompts';
import * as github from '../shared/github';
import logger from '../shared/logger';

class GithubOrgsGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    logger.debug('Orgs::Initializing::Start');
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }
    logger.debug('Orgs::Initializing::End');
  }

  prompting() {
    logger.debug('Orgs::Prompting::Start');
    return github.getOrgs()
      .then(orgs => {
        this.orgs = orgs;
        return this.prompt(prompts.orgs(orgs));
      })
      .then(answers => {
        this.config.set('orgs', answers);
        this.config.save();
        logger.debug('Orgs::Prompting::End');
      });
  }

}

module.exports = GithubOrgsGenerator;
