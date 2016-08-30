'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repository = repository;
exports.init = init;

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function repository(repos) {
  return [{
    name: 'name',
    message: 'Repository Name',
    validate: input => {
      return (0, _lodash2.default)(repos, { name: input }) ? 'Repository Exists' : true;
    },
    store: true
  }, {
    name: 'description',
    message: 'Repository Description',
    store: true
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
    }],
    store: true
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
    }],
    store: true
  }];
}

function init(gconfig) {
  return [{
    type: 'confirm',
    name: 'init',
    message: 'Initialize repository and add remote?',
    default: 'Y',
    store: true
  }, {
    when: answers => {
      return answers.init;
    },
    type: 'confirm',
    name: 'remote',
    message: 'Add remote repository to local git?',
    default: 'Y',
    store: true
  }, {
    when: answers => {
      return answers.remote;
    },
    type: 'list',
    name: 'type',
    message: 'Use HTTP or SSH for remote repository?',
    choices: ['http', 'ssh'],
    default: 'Y',
    store: true
  }, {
    when: answers => {
      return answers.remote;
    },
    type: 'confirm',
    name: 'pull',
    message: 'Pull new repository?',
    default: 'Y',
    store: true
  }];
}