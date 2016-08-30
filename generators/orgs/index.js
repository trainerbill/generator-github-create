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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GithubOrgsGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    _logger2.default.debug('Orgs::Initializing::Start');
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }
    _logger2.default.debug('Orgs::Initializing::End');
  }

  prompting() {
    _logger2.default.debug('Orgs::Prompting::Start');
    return github.getOrgs().then(orgs => {
      this.orgs = orgs;
      return this.prompt(prompts.orgs(orgs));
    }).then(answers => {
      this.config.set('orgs', answers);
      this.config.save();
      _logger2.default.debug('Orgs::Prompting::End');
    });
  }

}

module.exports = GithubOrgsGenerator;