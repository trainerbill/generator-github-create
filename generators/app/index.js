'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitGenerator extends _yeomanGenerator.Base {

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