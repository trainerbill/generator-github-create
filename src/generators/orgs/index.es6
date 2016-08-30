import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import * as prompts from './prompts';
import * as github from '../shared/github';
import logger from '../shared/logger';

class GithubOrgsGenerator extends Base {

  constructor(...args) {
    super(...args);
    /*
    //Options
    this.option('GitHubAPI', {
      required: false,
      defaults: {},
      desc: 'GitHubAPI Configuration'
    });
    */



  }

  initializing() {
    logger.debug("Orgs::Initializing::Start");
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }
  }

  prompting() {
    logger.debug("Orgs::Prompting::Start");
    return github.getOrgs()
      .then(orgs => {
        this.orgs = orgs;
        return this.prompt(prompts.orgs(orgs));
      })
      .then(answers => {
        //TODO .login is causing issues when answer is no on prompt
        this.config.set('orgs', { org: this.orgs[answers.org].login });
        logger.debug("Orgs::Prompting::End");
        this.config.save();
      });
  }

}

module.exports = GithubOrgsGenerator;
