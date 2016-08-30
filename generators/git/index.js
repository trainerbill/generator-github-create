'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _prompts = require('./prompts');

var prompts = _interopRequireWildcard(_prompts);

var _shell = require('../shared/shell');

var shell = _interopRequireWildcard(_shell);

var _logger = require('../shared/logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GithubGitGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('remoteUrl', {
      required: false,
      desc: 'Remote Url'
    });
  }

  initializing() {
    _logger2.default.debug("Git::Initializing::Start");
    this.config.set('git', {
      init: true,
      remote: true,
      url: this.options.remoteUrl || this.config.get(),
      repository: this.config.get('repository')
    });
  }

  prompting() {
    _logger2.default.debug("Git::Prompting::Start");
    return this.prompt(prompts.git(this.config.get('git'))).then(answers => {
      this.config.set('git', (0, _lodash2.default)(this.config.get('git'), answers));
    });
  }

  configuring() {
    _logger2.default.debug("Git::Configuring::Start");
    this.config.save();
  }

  install() {
    return shell.gitInit(this.config.get('git')).then(() => shell.gitRemote(this.config.get('git'))).then(() => shell.gitPull(this.config.get('git'))).then(() => shell.gitPull(this.config.get('git')));
  }

}

module.exports = GithubGitGenerator;