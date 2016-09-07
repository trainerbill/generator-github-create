import { Base } from 'yeoman-generator';
import * as github from '../shared/github';
import merge from 'lodash.merge';


class GithubReadmeGenerator extends Base {

  constructor(...args) {
    super(...args);
    let createconfig = this.config.get('create');
    this.option('profile', {
      type: String,
      alias: 'p',
      desc: 'Profile for badge.  Ex: https://david-dm.org/<PROFILE>/server-express-module',
      defaults: createconfig ? createconfig.org || createconfig.user : undefined
    });

    this.option('repository', {
      type: String,
      alias: 'r',
      desc: 'Repository.  Ex: https://david-dm.org/trainerbill/<REPOSITORY>',
      defaults: createconfig ? createconfig.name : undefined
    });

    this.option('title', {
      type: String,
      alias: 't',
      desc: 'Readme title',
      defaults: createconfig ? createconfig.name : 'Generated Repository'
    });

    this.option('description', {
      type: String,
      alias: 'd',
      desc: 'Readme title',
      defaults: createconfig ? createconfig.description : 'Generated Repository'
    });

    this.option('badges', {
      type: String,
      alias: 'b',
      desc: 'Comma delimited string of badges to enable',
      defaults: ''
    });

    this.option('skip-prompt', {
      type: String,
      alias: 's',
      desc: 'Skip prompting.  You will either need to supply all arguments or the defaults will be used.',
      defaults: false
    });
  }

  initializing() {
    this.allBadges = ['travis', 'coveralls','david','davidDev','gitter','npm'];
    let config = {
      'skip-prompt': this.options['skip-prompt'],
      badges: this.options.badges.split(','),
      profile: this.options.profile,
      repository: this.options.repository,
      title: this.options.title,
      description: this.options.description
    };
    return this.config.set('readme', config);
  }

  prompting() {
    let config = this.config.get('readme');
    if (config['skip-prompt']) {
      return true;
    }

    let prompts = [
      {
        name: 'title',
        default: config.title,
        message: 'README Title'
      },
      {
        name: 'description',
        default: config.description,
        message: 'README Description'
      },
      {
        type: 'confirm',
        name: 'usebadges',
        default: config.usebadges || true,
        message: 'Create Badges?'
      },
      {
        when: (answers) => { return answers.usebadges; },
        type    : 'checkbox',
        name    : 'badges',
        message : 'Select badges to enable',
        choices : this.allBadges,
        default : config.badges
      },
      {
        when: (answers) => { return answers.usebadges; },
        name: 'profile',
        default: config.profile,
        message: 'Badge Profile(user/org)'
      },
      {
        when: (answers) => { return answers.usebadges; },
        name: 'repository',
        default: config.repository,
        message: 'Badge Repository'
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
        this.config.set('readme', merge(this.config.get('readme'), answers));
      });
  }

  configuring() {
    this.config.save();
  }

  writing() {
    let config = this.config.get('readme');

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        profile: config.profile,
        repository: config.repository,
        badges: config.badges,
        description: config.description,
        title: config.title
      }
    );


  }

}

module.exports = GithubReadmeGenerator;
