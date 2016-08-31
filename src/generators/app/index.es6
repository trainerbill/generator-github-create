import { Base } from 'yeoman-generator';
import yosay from 'yosay';

class GitGenerator extends Base {

  constructor(...args) {
    super(...args);
  }

  initializing() {
    this.log(yosay("Welcome to the github repository generator!"));
    this.composeWith('github-create:authenticate');
    this.composeWith('github-create:orgs');
  }

  default() {
    this.composeWith('github-create:create');
  }

  install() {
    console.log(this.config.get('create').urls);
    this.composeWith('github-create:gitinit', {
      args: this.config.get('create').urls
    });
    this.composeWith('badges', {
      options: {
        'skip-install': this.options['skip-install'],
        user: this.config.get('orgs').org || this.config.get('authenticate').username,
        project: this.config.get('create').name,
        badges: ['travis', 'npm', 'coveralls', 'dependencies', 'devDependencies'],
        nosay: true
      }
    },
    {
      local: require.resolve('generator-badges')
    });
    this.composeWith('github-create:gitpush');
  }

}

module.exports = GitGenerator;
