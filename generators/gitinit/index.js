'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _shell = require('../shared/shell');

var shell = _interopRequireWildcard(_shell);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GithubGitInitGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    //arguments
    this.argument('urls', {
      type: Array,
      required: true,
      desc: 'RemoteUrl: git remote add origin <url>'
    });

    //Options
    this.option('skip-prompt', {
      type: String,
      alias: 's',
      desc: 'Skip prompting.  You will either need to supply all arguments or the defaults will be used.',
      defaults: false
    });

    this.option('name', {
      type: String,
      alias: 'n',
      desc: 'RemoteName: git remote add <name> https://blah',
      defaults: 'origin'
    });

    this.config.set('gitinit', (0, _lodash2.default)(this.config.get('gitinit'), {
      'skip-prompt': this.options['skip-prompt'],
      name: this.options.name
    }));

    this.config.save();
  }

  prompting() {
    let config = this.config.get('gitinit');

    if (config['skip-prompt']) {
      this.config.set('gitinit', (0, _lodash2.default)(this.config.get('gitinit'), { url: this.urls[0] }));
      return true;
    }

    let prompts = [{
      name: 'name',
      message: 'Remote Name',
      default: config.name,
      validate: input => {
        return shell.checkRemote(input).then(result => {
          return result;
        });
      }
    }, {
      when: answers => {
        return this.urls.length <= 1;
      },
      name: 'url',
      message: 'Remote Url',
      default: this.urls[0] || config.url
    }, {
      when: answers => {
        return this.urls.length > 1;
      },
      type: 'list',
      name: 'url',
      choices: this.urls,
      message: 'Remote Url',
      default: config.url
    }];

    return this.prompt(prompts).then(answers => {
      this.config.set('gitinit', (0, _lodash2.default)(this.config.get('gitinit'), answers));
    });
  }

  configuring() {
    this.config.save();
  }

  default() {
    return shell.gitInit(this.config.get('gitinit')).then(() => shell.gitRemote(this.config.get('gitinit'))).then(() => shell.gitPull(this.config.getAll()));
  }

}

module.exports = GithubGitInitGenerator;