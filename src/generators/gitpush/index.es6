import { Base } from 'yeoman-generator';
import * as shell from '../shared/shell';
import merge from 'lodash.merge';

class GithubGitPushGenerator extends Base {

  constructor(...args) {
    super(...args);

    //Options
    this.option('skip-prompt', {
      type: String,
      alias: 's',
      desc: 'Skip prompting.  You will either need to supply all arguments/options or the defaults will be used.',
      defaults: false
    });

    this.option('name', {
      type: String,
      alias: 'n',
      desc: 'Remote Name',
      defaults: 'origin'
    });

    this.option('branch', {
      type: String,
      alias: 'b',
      desc: 'Remote Branch',
      defaults: 'master'
    });

    this.option('message', {
      type: String,
      alias: 'm',
      desc: 'Git commit message',
      defaults: 'Initial Commit'
    });

    this.config.set('gitpush', merge(this.config.get('gitpush'), {
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

    let prompts = [
      {
        name    : 'message',
        message : 'Commit Message',
        default : config.message,
      },
      {
        name    : 'name',
        message : 'Remote Name',
        default : config.name
      },
      {
        name    : 'branch',
        message : 'Remote Branch',
        default : config.branch
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
        this.config.set('gitpush', merge(this.config.get('gitpush'), answers));
      });
  }

  configuring() {
    this.config.save();
  }

  default() {
    let config = this.config.get('gitpush');
    return shell.gitCommit(config)
      .then(() => shell.gitPush(config));
  }

}

module.exports = GithubGitPushGenerator;
