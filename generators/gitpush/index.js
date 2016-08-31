'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _shell = require('../shared/shell');

var shell = _interopRequireWildcard(_shell);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GithubGitPushGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('skip-prompt', {
      type: String,
      alias: "s",
      desc: "Skip prompting.  You will either need to supply all arguments/options or the defaults will be used.",
      defaults: false
    });

    this.option('name', {
      type: String,
      alias: "n",
      desc: "Remote Name",
      defaults: 'origin'
    });

    this.option('branch', {
      type: String,
      alias: "b",
      desc: "Remote Branch",
      defaults: 'master'
    });

    this.option('message', {
      type: String,
      alias: "m",
      desc: "Git commit message",
      defaults: "Initial Commit"
    });

    this.config.set('gitpush', (0, _lodash2.default)(this.config.get('gitpush'), {
      'skip-prompt': this.options['skip-prompt'],
      message: this.options.message,
      name: this.options.name,
      branch: this.options.branch
    }));
  }

  prompting() {
    let config = this.config.get('gitpush');
    if (config['skip-prompt']) {
      return true;
    }

    let prompts = [{
      name: 'message',
      message: 'Commit Message',
      default: config.message
    }, {
      name: 'name',
      message: 'Remote Name',
      default: config.name
    }, {
      name: 'branch',
      message: 'Remote Branch',
      default: config.branch
    }];

    return this.prompt(prompts).then(answers => {
      this.config.set('gitpush', (0, _lodash2.default)(this.config.get('gitpush'), answers));
    });
  }

  configuring() {
    this.config.save();
  }

  default() {
    let config = this.config.get('gitpush');
    return shell.gitCommit(config).then(() => shell.gitPush(config));
  }

}

module.exports = GithubGitPushGenerator;