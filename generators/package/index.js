'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GithubPackageGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.option('name', {
      type: String,
      alias: 'n',
      desc: 'Package Name'
    });

    this.option('description', {
      type: String,
      alias: 'd',
      desc: 'Package Description'
    });

    this.option('version', {
      type: String,
      alias: 'v',
      desc: 'Package Version'
    });

    this.option('keywords', {
      type: String,
      alias: 'k',
      desc: 'Package Keywords'
    });

    this.option('author', {
      type: String,
      alias: 'a',
      desc: 'Package Author'
    });

    this.option('main', {
      type: String,
      alias: 'm',
      desc: 'Package Main'
    });

    this.option('scope', {
      type: String,
      alias: 's',
      desc: 'Package Scope'
    });

    this.option('license', {
      type: String,
      alias: 'l',
      desc: 'License'
    });
  }

  initializing() {

    let createConfig = this.config.get('create');

    this.options = (0, _lodash4.default)(this.options, this.config.get('package'), {
      name: createConfig ? createConfig.name : _path2.default.basename(process.cwd()),
      version: '0.0.0',
      author: this.user.git.name(),
      main: 'dist/index.js',
      scope: false,
      license: true
    });
    /* istanbul ignore next: no need to test this */
    if (this.options.license) {
      this.composeWith('license:app', {
        options: {
          name: this.user.git.name(),
          email: this.user.git.email(),
          website: 'test'
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    }
  }

  prompting() {

    let prompts = [{
      type: 'confirm',
      name: 'scoped',
      default: this.options.scoped,
      message: 'Is this a scoped package? Ex: @modern-mean/server-base-module'
    }, {
      when: answers => {
        return answers.scoped;
      },
      name: 'scope',
      default: this.options.scope,
      message: 'Package Scope'
    }];
    return this.prompt(prompts).then(answers => {
      this.config.set('package', (0, _lodash2.default)(this.config.get('package'), answers));
      return [{
        name: 'name',
        default: this.options.name,
        message: 'Package Name'
      }, {
        name: 'description',
        default: this.options.description,
        message: 'Package Description'
      }, {
        name: 'version',
        default: this.options.version,
        message: 'Package Version'
      }, {
        name: 'keywords',
        default: this.options.keywords ? this.options.keywords.join(',') : this.options.keywords,
        message: 'Package Keywords(comma separated)'
      }, {
        name: 'author',
        default: this.options.author,
        message: 'Package Author'
      }, {
        name: 'main',
        default: this.options.main,
        message: 'Package Main'
      }];
    }).then(prompts => this.prompt(prompts)).then(answers => {
      this.config.set('package', (0, _lodash2.default)(this.config.get('package'), answers));
    });
  }

  configuring() {
    return this.config.save();
  }

  default() {
    let config = this.config.get('package');

    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    /* istanbul ignore next: no need to test this */
    if (!pkg) {
      pkg = this.fs.readJSON(this.fs.writeJSON(this.destinationPath('package.json'), {}));
    }

    pkg.name = config.scoped ? '@' + config.scope + '/' + config.name : config.name;
    pkg.description = config.description;
    pkg.version = config.version;
    pkg.author = config.author;
    pkg.main = config.main;
    pkg.keywords = config.keywords.split(',').map(item => item.trim());
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

}

module.exports = GithubPackageGenerator;