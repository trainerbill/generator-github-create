'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _prompts = require('./prompts');

var prompts = _interopRequireWildcard(_prompts);

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

var _logger = require('../shared/logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.find');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitCreateGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    _logger2.default.debug('Create::Initializing::Start');
    this.tempConfig = {};
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }

    if (!this.config.get('orgs')) {
      this.config.set('orgs', {});
    }
    _logger2.default.debug('Create::Initializing::End');
  }

  prompting() {
    _logger2.default.debug('Create::Prompting::Start');
    return github.getRepos(this.config.get('authenticate'), this.config.get('orgs')).then(repos => this.prompt(prompts.repository(repos))).then(answers => {
      this.tempConfig = (0, _lodash2.default)(this.tempConfig, answers);
    }).then(() => {
      this.config.set('create', this.tempConfig);
      _logger2.default.debug('Create::Prompting::End', this.config.get('create'));
    });
  }

  configuring() {
    _logger2.default.debug('Create::Configuring::Start');
    this.config.save();
    _logger2.default.debug('Create::Configuring::End');
  }

  install() {
    _logger2.default.debug('Create::Install::Start');
    return github.createRepository(this.config.get('create'), this.config.get('orgs')).then(repo => {
      this.config.set((0, _lodash2.default)(this.config.get('create'), { repository: { http_url: repo.html_url, ssh_url: repo.ssh_url } }));
      this.config.save();
      _logger2.default.debug('Create::Install::End');
    });
  }

}

module.exports = GitCreateGenerator;