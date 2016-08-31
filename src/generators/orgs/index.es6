import { Base } from 'yeoman-generator';
import * as github from '../shared/github';
import merge from 'lodash.merge';


class GithubOrgsGenerator extends Base {

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

    this.config.set('orgs', merge(this.config.get('orgs'), {
      'skip-prompt': this.options['skip-prompt'],
      org: this.options.org
    }));

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

    return github.getOrgs()
      .then(orgs => {
        let choices = orgs.map(function(item) { return item.login; });

        return [
          {
            when: (answers) => { return orgs.length; },
            type    : 'confirm',
            name    : 'use',
            message : 'Will this repository be part of an organization you belong to?',
            default : config.use
          },
          {
            when: (answers) => { return answers.use; },
            type: 'list',
            name: 'org',
            default: config.org || 0,
            message: 'Select your organization',
            choices: choices
          }
        ];
      })
      .then(prompts => this.prompt(prompts))
      .then(answers => {
        this.config.set('orgs', answers);
        this.config.save();
      });
  }

}

module.exports = GithubOrgsGenerator;
