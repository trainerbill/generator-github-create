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
    /*
    //Options
    this.option('GitHubAPI', {
      required: false,
      defaults: {},
      desc: 'GitHubAPI Configuration'
    });
    */
  }

  initializing() {
    _logger2.default.debug("Orgs::Initializing::Start");
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('@modern-mean/git:authenticate');
    }
  }

  prompting() {
    _logger2.default.debug("Orgs::Prompting::Start");
    return github.getOrgs().then(orgs => {
      this.orgs = orgs;
      return this.prompt(prompts.orgs(orgs));
    }).then(answers => {
      //TODO .login is causing issues when answer is no on prompt
      this.config.set('orgs', { org: this.orgs[answers.org].login });
      _logger2.default.debug("Orgs::Prompting::End");
      this.config.save();
    });
  }

}

module.exports = GithubOrgsGenerator;