'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GithubOrgsGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('skip-prompt', {
      type: String,
      alias: 's',
      desc: 'Skip prompting.  You will either need to supply all arguments or the defaults will be used.',
      defaults: false
    });

    this.option('org', {
      type: String,
      alias: 'o',
      desc: 'Organization'
    });

    this.config.set('orgs', (0, _lodash2.default)(this.config.get('orgs'), {
      'skip-prompt': this.options['skip-prompt'],
      org: this.options.org
    }));

    this.config.save();
  }

  initializing() {
    //Authenticate Github API
    if (!github.get()) {
      this.composeWith('github-create:authenticate');
    }
  }

  prompting() {
    let config = this.config.get('orgs');
    if (config['skip-prompt']) {
      return true;
    }

    return github.getOrgs().then(orgs => {
      let choices = orgs.map(function (item) {
        return item.login;
      });

      return [{
        when: answers => {
          return orgs.length;
        },
        type: 'confirm',
        name: 'use',
        message: 'Will this repository be part of an organization you belong to?',
        default: config.use
      }, {
        when: answers => {
          return answers.use;
        },
        type: 'list',
        name: 'org',
        default: config.org || 0,
        message: 'Select your organization',
        choices: choices
      }];
    }).then(prompts => this.prompt(prompts)).then(answers => {
      this.config.set('orgs', answers);
      this.config.save();
    });
  }

}

module.exports = GithubOrgsGenerator;