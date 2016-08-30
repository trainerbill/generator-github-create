'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logger = require('../shared/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    _logger2.default.debug('App::initializing::Start');
    //this.composeWith('@modern-mean/git:authenticate', { options: { GitHubAPI: { debug: true } } });
    this.composeWith('@modern-mean/git:authenticate');
    this.composeWith('@modern-mean/git:orgs');
    _logger2.default.debug('App::Initializing::End');
  }

  install() {
    _logger2.default.debug('App::Install::Start');
    this.composeWith('@modern-mean/git:create');
    _logger2.default.debug('App::Install::End');
  }

  end() {
    _logger2.default.debug('App::End::Start');
    this.composeWith('@modern-mean/git:git');
    _logger2.default.debug('App::End::End');
  }

}

module.exports = GitGenerator;