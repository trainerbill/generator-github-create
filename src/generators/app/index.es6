import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import logger from '../shared/logger';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    logger.debug('App::initializing::Start');
    //this.composeWith('@modern-mean/git:authenticate', { options: { GitHubAPI: { debug: true } } });
    this.composeWith('@modern-mean/git:authenticate');
    this.composeWith('@modern-mean/git:orgs');
    logger.debug('App::Initializing::End');
  }

  install() {
    logger.debug('App::Install::Start');
    this.composeWith('@modern-mean/git:create');
    logger.debug('App::Install::End');
  }

  end() {
    logger.debug('App::End::Start');
    this.composeWith('@modern-mean/git:git');
    logger.debug('App::End::End');
  }

}

module.exports = GitGenerator;
