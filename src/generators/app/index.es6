import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import GitHubApi from 'github';
import { find } from 'lodash';
import { merge } from 'lodash';
import * as prompts from './prompts';
import defaultConfig from './config';
import * as shell from './shell';
import * as run from './run';
import { MMConfig } from '@modern-mean/server-config-module';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
    args.push({ GitGeneratorConfig: { GitHubApi: { debug: true } } });
    this.defaultConfig = defaultConfig;
  
    //Config looks for key of GitGeneratorConfig in all of ...args
    args.map(item => this.defaultConfig = merge(this.defaultConfig, item['GitGeneratorConfig']));

    this.configModule = new MMConfig(this.defaultConfig);
    this.config = this.configModule.get();

    //Initialize Github API
    this.github = new GitHubApi(this.config.GitHubApi);

  }

  initializing() {
    return run.initializing(this);
  }

  prompting() {
    return run.prompting(this);
  }

  install() {
    return run.install(this);
  }

}

module.exports = GitGenerator;
