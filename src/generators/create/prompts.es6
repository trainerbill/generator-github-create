import find from 'lodash.find';

export function repository(repos) {
    return [
      {
        name: 'name',
        message: 'Repository Name',
        validate: (input) => { return ((find(repos, { name: input })) ? 'Repository Exists' : true ); },
        store: true
      },
      {
        name: 'description',
        message: 'Repository Description',
        store: true
      },
      {
        type: 'list',
        name: 'private',
        message: 'Access',
        choices: [
          {
            name: 'Public',
            value: false
          },
          {
            name: 'Private - You have to pay for this',
            value: true
          }
        ],
        store: true
      },
      {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: [
          {
            name: 'ISC',
            value: 'isc'
          },
          {
            name: 'MIT',
            value: 'mit'
          },
          {
            name: 'Apache',
            value: 'apache'
          }
        ],
        store: true
      }
    ];
}





export function init(gconfig) {
  return [{
    type    : 'confirm',
    name    : 'init',
    message : 'Initialize repository and add remote?',
    default: 'Y',
    store   : true
  },
  {
    when: (answers) => { return answers.init; },
    type    : 'confirm',
    name    : 'remote',
    message : 'Add remote repository to local git?',
    default: 'Y',
    store   : true
  },
  {
    when: (answers) => { return answers.remote; },
    type    : 'list',
    name    : 'type',
    message : 'Use HTTP or SSH for remote repository?',
    choices: ['http', 'ssh'],
    default: 'Y',
    store   : true
  },
  {
    when: (answers) => { return answers.remote; },
    type    : 'confirm',
    name    : 'pull',
    message : 'Pull new repository?',
    default: 'Y',
    store   : true
  }];
}
