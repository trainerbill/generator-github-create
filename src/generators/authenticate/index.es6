import { Base } from 'yeoman-generator';
import * as github from '../shared/github';
import * as shell from '../shared/shell';
import merge from 'lodash.merge';
import defaults from 'lodash.defaults';

class GithubAuthenticateGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.option('debug', {
      type: String,
      alias: 'd',
      desc: 'GitHubAPI Debug'
    });

    this.option('host', {
      type: String,
      alias: 'h',
      desc: 'Github Host'
    });

    this.option('protocol', {
      type: String,
      alias: 'p',
      desc: 'Github Protocol'
    });

    this.option('path', {
      type: String,
      alias: 'q',
      desc: 'Github Path:  for some GHEs; none for GitHub.com'
    });

    this.option('twofactor', {
      type: String,
      alias: 't',
      desc: 'Enable 2 factor authentication'
    });

    this.option('scopes', {
      type: String,
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
      desc: 'App Name for Github Authorization'
    });

    this.option('appUrl', {
      type: String,
      alias: 'o',
      desc: 'App URL for Github Authorization'
    });

  }

  initializing() {

    this.options = defaults(this.options, this.config.get('authenticate'), {
      debug: false,
      host: 'api.github.com',
      protocol: 'https',
      path: '',
      twofactor: false,
      scopes: 'user,public_repo,repo,repo:status',
      appName: 'generator-github-create',
      appUrl: 'https://github.com/trainerbill/generator-github-create'
    });

    let ghsetup = {
      debug: this.options.debug,
      host: this.options.host,
      protocol: this.options.protocol,
      pathPrefix: this.options.path || '/',
      headers: {
        'user-agent': this.options.appName
      }
    };

    return shell.getUsername()
      .then(username => {
        /* istanbul ignore next: tough to test */
        if (!this.options.username) {
          this.options.username = username;
        }
      })
      .then(github.init(ghsetup))
      .then(() => {
        return [
          {
            name    : 'username',
            message : 'Github Username',
            default: this.options.username
          },
          {
            when: (answers) => { return answers.username !== this.options.username; },
            type: 'confirm',
            name: 'saveuser',
            message: 'Save username to git config?  Will make generation faster next time',
            default: 'Y'
          },
          {
            type    : 'password',
            name    : 'password',
            message : 'Github Password'
          },
          {
            type: 'confirm',
            name    : 'twofactor',
            message : 'Use two factor authentication?',
            default: this.options.twofactor || false
          },
          {
            when: (answers) => { return answers.twofactor; },
            name    : 'twofactorcode',
            message : 'Two Factor Code'
          }
        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.password = answers.password;
        this.twofactorcode = answers.twofactorcode;
        delete answers.password;
        delete answers.twofactorcode;
        /* istanbul ignore next: tough to test */
        if(answers.saveuser) {
          shell.saveUsername(answers.username);
        }
        this.config.set('authenticate', answers);
        return answers;
      })
      .then(answers => github.authenticate(answers.username, this.password))
      .then(() => github.getAuthorization(this.options.appName))
      .then(authorization => github.deleteAuthorization(authorization))
      .then(() => github.createAuthorization({ appName: this.options.appName, appUrl: this.options.appUrl, scopes: this.options.scopes }, this.twofactorcode))
      .then(() => {
        this.config.save();
      });
  }

}

module.exports = GithubAuthenticateGenerator;
