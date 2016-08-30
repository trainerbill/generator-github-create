import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import { find } from 'lodash';
import { merge } from 'lodash';
import * as prompts from './prompts';
import * as run from './run';
import defaultConfig from '../shared/config';
import * as github from '../shared/github';

class GitSetupGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.config.set(defaultConfig);

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
