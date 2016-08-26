'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _lodash = require('lodash');

var _prompts = require('./prompts');

var prompts = _interopRequireWildcard(_prompts);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _shell = require('./shell');

var shell = _interopRequireWildcard(_shell);

var _run = require('./run');

var run = _interopRequireWildcard(_run);

var _serverConfigModule = require('@modern-mean/server-config-module');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);
    args.push({ GitGeneratorConfig: { GitHubApi: { debug: true } } });
    this.defaultConfig = _config2.default;

    //Config looks for key of GitGeneratorConfig in all of ...args
    args.map(item => this.defaultConfig = (0, _lodash.merge)(this.defaultConfig, item['GitGeneratorConfig']));

    this.configModule = new _serverConfigModule.MMConfig(this.defaultConfig);
    this.config = this.configModule.get();

    //Initialize Github API
    this.github = new _github2.default(this.config.GitHubApi);
  }

  initializing() {
    return run.initializing(this);
  }

  prompting() {
    return run.prompting(this);
  }

  install() {
    return run.install(this);
  }

}

module.exports = GitGenerator;