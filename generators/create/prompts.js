'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repository = repository;

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function repository(repos) {
  return [{
    name: 'name',
    message: 'Repository Name',
    validate: input => {
      return (0, _lodash2.default)(repos, { name: input }) ? input + ' repository exists.' : true;
    }
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