'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _prompts = require('./prompts');

var prompts = _interopRequireWildcard(_prompts);

var _run = require('./run');

var run = _interopRequireWildcard(_run);

var _config = require('../shared/config');

var _config2 = _interopRequireDefault(_config);

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitSetupGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.config.set(_config2.default);

    this.option('reponame', {
      required: false,
      defaults: {},
      desc: 'Repository Name'
    });

    //Initialize Github API
    github.get() || github.init(this.options.GitHubAPI);
  }

  initializing() {
    return run.initializing(this);
  }

  prompting() {
    return run.prompting(this);
  }

  end() {
    this.config.save();
  }

}

module.exports = GitSetupGenerator;