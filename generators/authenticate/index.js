'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _prompts = require('./prompts');

var prompts = _interopRequireWildcard(_prompts);

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

var _shell = require('../shared/shell');

var shell = _interopRequireWildcard(_shell);

var _logger = require('../shared/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GithubAuthenticateGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('GitHubAPI', {
      required: false,
      defaults: {},
      desc: 'GitHubAPI Configuration'
    });

    //Options
    this.option('username', {
      required: false,
      desc: 'Github Username'
    });

    //Options
    this.option('appName', {
      required: true,
      defaults: '@modern-mean/generator-git',
      desc: 'App Name for Github Authorization'
    });

    //Options
    this.option('appUrl', {
      required: true,
      defaults: 'https://github.com/modern-mean/generator-git',
      desc: 'App URL for Github Authorization'
    });
  }

  initializing() {
    _logger2.default.debug('Authenticate::Initializing::Start');
    //Initialize Github API
    github.get() || github.init(this.options.GitHubAPI);

    //Initialize Config
    this.config.set('authenticate', {
      username: shell.getUsername()
    });

    return this.prompt(prompts.authentication(this.config.get('authenticate').username)).then(answers => {
      this.config.get('authenticate').username = answers.username;
      this.password = answers.password;
      if (answers.save) {
        shell.saveUsername(answers.username);
      }
    }).then(() => github.authenticate(this.config.get('authenticate').username, this.password)).then(() => github.getAuthorization(this.options.appName)).then(authorization => github.deleteAuthorization(authorization)).then(() => github.createAuthorization(this.options.appName, this.options.appUrl)).then(() => {
      this.config.save();
      _logger2.default.debug('Authenticate::Initializing::End');
    });
  }

  install() {
    _logger2.default.debug('Authenticate::Install::Start');
  }

}

module.exports = GithubAuthenticateGenerator;