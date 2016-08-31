import { Base } from 'yeoman-generator';
import yosay from 'yosay';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    this.log(yosay('Welcome to the github repository generator!'));
    this.composeWith('github-create:authenticate');
    this.composeWith('github-create:orgs');

  }

  default() {
    this.composeWith('github-create:create', {
      options: {
        org: this.config.get('orgs').org || undefined,
        user: this.config.get('authenticate').user
      }
    });
  }

  writing() {
    this.composeWith('github-create:readme', {
      options: {
        profile: this.config.get('create').org || this.config.get('authenticate').user,
        repository: this.config.get('create').name,
        title: this.config.get('create').name,
        description: this.config.get('create').description
      }
    });
  }

  install() {
    this.composeWith('github-create:gitinit', {
      args: this.config.get('create').urls
    });


    this.composeWith('github-create:gitpush');
  }

}

module.exports = GitGenerator;
