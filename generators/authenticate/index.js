'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

var _shell = require('../shared/shell');

var shell = _interopRequireWildcard(_shell);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GithubAuthenticateGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.option('debug', {
      type: String,
      defaults: false,
      alias: 'd',
      desc: 'GitHubAPI Debug'
    });

    this.option('host', {
      type: String,
      defaults: 'api.github.com',
      alias: 'h',
      desc: 'Github Host'
    });

    this.option('protocol', {
      type: String,
      defaults: 'https',
      alias: 'p',
      desc: 'Github Protocol'
    });

    this.option('path', {
      type: String,
      defaults: '',
      alias: 'q',
      desc: 'Github Path:  for some GHEs; none for GitHub.com'
    });

    this.option('twofactor', {
      type: String,
      defaults: undefined,
      alias: 't',
      desc: 'Enable 2 factor authentication'
    });

    this.option('scopes', {
      type: String,
      defaults: 'user,public_repo,repo,repo:status',
      alias: 's',
      desc: 'Comma separated list for github authorization scopes'
    });

    this.option('username', {
      type: String,
      alias: 'u',
      desc: 'Github Username'
    });

    this.option('appName', {
      type: String,
      alias: 'n',
      defaults: 'generator-github-create',
      desc: 'App Name for Github Authorization'
    });

    this.option('appUrl', {
      type: String,
      alias: 'o',
      defaults: 'https://github.com/trainerbill/generator-github-create',
      desc: 'App URL for Github Authorization'
    });

    this.config.set('authenticate', (0, _lodash2.default)(this.config.get('authenticate'), {
      twofactor: this.options.twofactor,
      github: {
        debug: this.options.debug,
        host: this.options.host,
        protocol: this.options.protocol,
        pathPrefix: this.options.path,
        headers: {
          'user-agent': this.options.appName
        },
        scopes: this.options.scopes.trim(this.options.scopes.split(','))
      },
      username: this.options.username || shell.getUsername(),
      appName: this.options.appName,
      appUrl: this.options.appUrl
    }));
  }

  initializing() {
    let config = this.config.get('authenticate');
    //Initialize Github API
    github.get() || github.init(config.github);

    let prompts = [{
      name: 'username',
      message: 'Github Username',
      default: config.username
    }, {
      when: answers => {
        return answers.username !== config.username;
      },
      type: 'confirm',
      name: 'save',
      message: 'Save username to git config?  Will make generation faster next time',
      default: 'Y'
    }, {
      type: 'password',
      name: 'password',
      message: 'Github Password'
    }, {
      type: 'confirm',
      name: 'twofactor',
      message: 'Use two factor authentication?',
      default: config.twofactor || false
    }, {
      when: answers => {
        return answers.twofactor;
      },
      name: 'twofactorcode',
      message: 'Two Factor Code'
    }];

    return this.prompt(prompts).then(answers => {
      this.password = answers.password;
      this.twofactorcode = answers.twofactorcode;
      delete answers.password;
      delete answers.twofactorcode;
      this.config.set('authenticate', (0, _lodash2.default)(this.config.get('authenticate'), answers));
      if (answers.save) {
        shell.saveUsername(answers.username);
      }
    }).then(() => github.authenticate(config.username, this.password)).then(() => github.getAuthorization(config, this.twofactorcode)).then(authorization => github.deleteAuthorization(authorization)).then(() => github.createAuthorization(config)).then(() => {
      this.config.save();
    });
  }

}

module.exports = GithubAuthenticateGenerator;