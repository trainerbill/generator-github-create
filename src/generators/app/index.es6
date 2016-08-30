import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import logger from '../shared/logger';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    logger.debug('App::initializing::Start');
    //this.composeWith('github-create:authenticate', { options: { GitHubAPI: { debug: true } } });
    this.composeWith('github-create:authenticate');
    this.composeWith('github-create:orgs');
    logger.debug('App::Initializing::End');
  }

  install() {
    logger.debug('App::Install::Start');
    this.composeWith('github-create:create');
    logger.debug('App::Install::End');
  }

  end() {
    logger.debug('App::End::Start');
    this.composeWith('github-create:git');
    logger.debug('App::End::End');
  }

}

module.exports = GitGenerator;
