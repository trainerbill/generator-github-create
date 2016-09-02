'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.destroy = destroy;
exports.get = get;
exports.authenticate = authenticate;
exports.getAuthorization = getAuthorization;
exports.deleteAuthorization = deleteAuthorization;
exports.createAuthorization = createAuthorization;
exports.getOrgs = getOrgs;
exports.getRepos = getRepos;
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

function destroy() {
  return github = undefined;
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

function getAuthorization(config) {
  return new Promise((resolve, reject) => {
    github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      let authorization = (0, _lodash.find)(auths, { app: { name: config.appName } }) || undefined;
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

function createAuthorization(config, twofactorcode) {
  return new Promise((resolve, reject) => {
    let setup = {
      scopes: config.scopes,
      note: config.appName,
      note_url: config.appUrl
    };

    if (twofactorcode) {
      setup.headers = {
        'X-GitHub-OTP': twofactorcode
      };
    }

    github.authorization.create(setup, (err, res) => {
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

function getRepos(config) {
  return new Promise((resolve, reject) => {
    if (config.org) {
      github.repos.getForOrg({ org: config.org, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    } else {
      github.repos.getForUser({ user: config.user, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
}

function createRepository(config) {
  return new Promise((resolve, reject) => {
    if (config.org) {
      github.repos.createForOrg({
        org: config.org,
        name: config.name,
        description: config.description,
        private: config.private,
        license_template: config.license,
        auto_init: config.autoinit
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    } else {
      github.repos.create({
        name: config.name,
        description: config.description,
        private: config.private,
        license_template: config.license,
        auto_init: config.autoinit
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
}