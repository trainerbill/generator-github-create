'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.get = get;
exports.authenticate = authenticate;
exports.getAuthorization = getAuthorization;
exports.deleteAuthorization = deleteAuthorization;
exports.createAuthorization = createAuthorization;
exports.getOrgs = getOrgs;
exports.getRepos = getRepos;
exports.checkRepo = checkRepo;
exports.createRepository = createRepository;

var _lodash = require('lodash');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let github;

function init(config) {
  return github = new _github2.default(config);
}

function get() {
  return github;
}

function authenticate(user, pass) {
  return new Promise((resolve, reject) => {
    github.authenticate({
      type: 'basic',
      username: user,
      password: pass
    });
    return resolve(github);
  });
}

function getAuthorization(appName) {
  return new Promise((resolve, reject) => {
    github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      let authorization = (0, _lodash.find)(auths, { app: { name: appName } }) || undefined;
      return resolve(authorization);
    });
  });
}

function deleteAuthorization(authorization) {
  return new Promise((resolve, reject) => {
    if (!authorization) {
      return resolve();
    }
    github.authorization.delete({ id: authorization.id }, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function createAuthorization(appName, appUrl) {
  return new Promise((resolve, reject) => {
    github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: appName,
      note_url: appUrl,
      headers: {
        'X-GitHub-OTP': 'two-factor-code'
      }
    }, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function getOrgs() {
  return new Promise((resolve, reject) => {
    github.users.getOrgs({ page: '1', per_page: '100' }, (err, orgs) => {
      if (err) {
        return reject(err);
      }

      return resolve(orgs);
    });
  });
}

function getRepos(authenticate, orgs) {
  return new Promise((resolve, reject) => {
    if (orgs.org) {
      github.repos.getForOrg({ org: orgs.org, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    } else {
      github.repos.getForUser({ user: authenticate.username, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
}

function checkRepo() {
  return new Promise((resolve, reject) => {
    let repository = (0, _lodash.find)(generator.repos, { name: generator.config.get('repo').name });
    if (repository) {
      console.log(_chalk2.default.bold.red('Repository already exists!'));
      return reject('Repository already exists!');
    }
    return resolve();
  });
}

function createRepository(repository, orgs) {
  return new Promise((resolve, reject) => {
    if (orgs.org) {
      github.repos.createForOrg({
        org: orgs.org,
        name: repository.name,
        description: repository.description,
        private: repository.private,
        license_template: repository.license,
        auto_init: true
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    } else {
      github.repos.create({
        name: repository.name,
        description: repository.description,
        private: repository.private,
        license_template: repository.license,
        auto_init: true
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
}