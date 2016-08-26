'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitEmail = gitEmail;
exports.gitName = gitName;
exports.gitUsername = gitUsername;
exports.orgs = orgs;
exports.create = create;
exports.init = init;
function gitEmail(email) {
  return [{
    name: 'email',
    message: 'Git Email',
    default: email
  }, {
    when: answers => {
      return answers.email !== email;
    },
    type: 'confirm',
    name: 'save',
    message: 'Save email to git config?  Will make generation faster next time',
    default: 'Y'
  }];
}

function gitName(name) {
  return [{
    name: 'name',
    message: 'Git Name',
    default: name
  }, {
    when: answers => {
      return answers.name !== name;
    },
    type: 'confirm',
    name: 'save',
    message: 'Save name to git config?  Will make generation faster next time',
    default: 'Y'
  }];
}

function gitUsername(username) {

  return [{
    name: 'username',
    message: 'Github Username',
    default: username
  }, {
    when: answers => {
      return answers.username !== username;
    },
    type: 'confirm',
    name: 'save',
    message: 'Save username to git config?  Will make generation faster next time',
    default: 'Y'
  }];
}

const authentication = exports.authentication = [{
  type: 'password',
  name: 'password',
  message: 'Github Password'
}];

function orgs(orgs) {
  let choices = orgs.map(function (item) {
    return { name: item['login'], value: orgs.indexOf(item) };
  });
  return [{
    type: 'confirm',
    name: 'isOrg',
    message: 'Will this repository be part of an organization you belong to?'
  }, {
    when: answers => {
      return answers.isOrg;
    },
    type: 'list',
    name: 'org',
    message: 'Select your organization',
    choices: choices
  }];
}

const repoInfo = exports.repoInfo = [{
  name: 'name',
  message: 'Repository Name'
}, {
  name: 'description',
  message: 'Repository Description'
}, {
  type: 'list',
  name: 'private',
  message: 'Access',
  choices: [{
    name: 'Public',
    value: false
  }, {
    name: 'Private - You have to pay for this',
    value: true
  }]
}, {
  type: 'list',
  name: 'license',
  message: 'License',
  choices: [{
    name: 'ISC',
    value: 'isc'
  }, {
    name: 'MIT',
    value: 'mit'
  }, {
    name: 'Apache',
    value: 'apache'
  }]
}];

function create(gconfig) {
  return [{
    type: 'confirm',
    name: 'create',
    message: 'Create the following Repo?  name: ' + gconfig.repository.name + (gconfig.org ? ' org: ' + gconfig.org.login : ' user: ' + gconfig.username)
  }];
}

function init(gconfig) {
  return [{
    type: 'confirm',
    name: 'init',
    message: 'Initialize repository and add remote?',
    default: 'Y'
  }, {
    when: answers => {
      return answers.init;
    },
    type: 'confirm',
    name: 'remote',
    message: 'Add remote repository to local git?',
    default: 'Y'
  }, {
    when: answers => {
      return answers.remote;
    },
    type: 'list',
    name: 'type',
    message: 'Use HTTP or SSH for remote repository?',
    choices: ['http', 'ssh'],
    default: 'Y'
  }, {
    when: answers => {
      return answers.remote;
    },
    type: 'confirm',
    name: 'pull',
    message: 'Pull new repository?',
    default: 'Y'
  }];
}