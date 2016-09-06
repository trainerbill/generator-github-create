'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitGenerator extends _yeomanGenerator.Base {

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
      defaults: ['authenticate', 'orgs', 'create', 'readme', 'gitinit', 'gitpush'],
      required: false,
      desc: 'List of generators to use. Ex: yo github-create orgs create readme'
    });
  }

  initializing() {
    this.log((0, _yosay2.default)('Welcome to the github repository generator!'));
    if (this.generators.indexOf('authenticate') !== -1) {
      this.composeWith('github-create:authenticate', {
        options: {
          debug: this.options.debug
        }
      });
    }

    if (this.generators.indexOf('orgs') !== -1) {
      this.composeWith('github-create:orgs');
    }
  }

  default() {

    if (this.generators.indexOf('create') !== -1) {
      this.composeWith('github-create:create', {
        options: {
          org: this.config.get('orgs') ? this.config.get('orgs').org : undefined,
          user: this.config.get('authenticate') ? this.config.get('authenticate').user : undefined
        }
      });
    }
  }

  writing() {
    let config = this.config.get('app');

    if (this.generators.indexOf('readme') !== -1) {
      this.composeWith('github-create:readme', {
        options: {
          profile: this.config.get('orgs') ? this.config.get('orgs').org : undefined || this.config.get('authenticate') ? this.config.get('authenticate').user : undefined,
          repository: this.config.get('create') ? this.config.get('create').name : undefined,
          title: this.config.get('create') ? this.config.get('create').name : undefined,
          description: this.config.get('create') ? this.config.get('create').description : undefined
        }
      });
    }
  }

  install() {
    if (this.generators.indexOf('gitinit') !== -1) {
      this.composeWith('github-create:gitinit', {
        args: this.config.get('create') ? this.config.get('create').urls : undefined
      });
    }
  }

  end() {
    if (this.generators.indexOf('gitpush') !== -1) {
      this.composeWith('github-create:gitpush');
    }
  }

}

module.exports = GitGenerator;