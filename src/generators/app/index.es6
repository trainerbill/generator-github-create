import { Base } from 'yeoman-generator';
import yosay from 'yosay';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.option('debug', {
      type: String,
      defaults: false,
      alias: 'd',
      desc: 'GitHubAPI Debug'
    });

    this.argument('generators', {
      type: Array,
      defaults: ['authenticate', 'orgs','create','readme','gitinit','gitpush'],
      required: false,
      desc: 'List of generators to use. Ex: yo github-create orgs create readme'
    });


  }

  initializing() {
    this.log(yosay('Welcome to the github repository generator!'));
    if(this.generators.indexOf('authenticate') !== -1) {
      this.composeWith('github-create:authenticate', {
        options: {
          debug: this.options.debug
        }
      });
    }

    if(this.generators.indexOf('orgs') !== -1) {
      this.composeWith('github-create:orgs');
    }

  }

  default() {

    if(this.generators.indexOf('create') !== -1) {
      this.composeWith('github-create:create', {
        options: {
          org: this.config.get('orgs') ? this.config.get('orgs').org : undefined,
          user: this.config.get('authenticate') ? this.config.get('authenticate').user : undefined,
        }
      });
    }
  }

  writing() {
    let config = this.config.get('app');

    if(this.generators.indexOf('readme') !== -1) {
      this.composeWith('github-create:readme', {
        options: {
          profile: this.config.get('orgs') ? this.config.get('orgs').org : undefined || this.config.get('authenticate') ? this.config.get('authenticate').user : undefined,
          repository: this.config.get('create') ? this.config.get('create').name : undefined,
          title: this.config.get('create') ? this.config.get('create').name : undefined,
          description: this.config.get('create') ? this.config.get('create').description : undefined,
        }
      });
    }
  }

}

module.exports = GitGenerator;
