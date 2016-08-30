import { Base } from 'yeoman-generator';
import chalk from 'chalk';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    //this.composeWith('@modern-mean/git:authenticate', { options: { GitHubAPI: { debug: true } } });
    this.composeWith('@modern-mean/git:authenticate');
    this.composeWith('@modern-mean/git:orgs');
  }

  install() {
    this.composeWith('@modern-mean/git:create');
  }

  end() {
    this.composeWith('@modern-mean/git:git');
  }

}

module.exports = GitGenerator;
