'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(generator) {
  return new Promise((resolve, reject) => {
    generator.github.authenticate({
      type: 'basic',
      username: generator.config.github.username,
      password: generator.config.github.password
    });
    return resolve(generator);
  });
}

function getAuthorization(generator) {
  return new Promise((resolve, reject) => {
    generator.github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      generator.config.github.authorization.current = (0, _lodash.find)(auths, { app: { name: generator.config.github.authorization.name } }) || undefined;
      return resolve(generator);
    });
  });
}

function deleteAuthorization(generator) {
  return new Promise((resolve, reject) => {
    if (!generator.config.github.authorization.current) {
      return resolve(generator);
    }
    generator.github.authorization.delete({ id: generator.config.github.authorization.current.id }, (err, res) => {
      if (err) {
        return reject(err);
      }
      delete generator.config.github.authorization.current;
      return resolve(generator);
    });
  });
}

function createAuthorization(generator) {
  return new Promise((resolve, reject) => {
    generator.github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: generator.config.github.authorization.name,
      note_url: 'https://github.com/modern-mean/generator-git',
      headers: {
        'X-GitHub-OTP': 'two-factor-code'
      }
    }, (err, res) => {
      if (err) {
        return reject(err);
      }
      generator.config.github.authorization.token = res.token;
      return resolve(generator);
    });
  });
}

function getOrgs(generator) {
  return new Promise((resolve, reject) => {
    generator.github.users.getOrgs({ page: '1', per_page: '100' }, (err, orgs) => {
      if (err) {
        return reject(err);
      }

      generator.config.github.orgs = orgs;
      return resolve(generator);
    });
  });
}

function getRepos(generator) {
  return new Promise((resolve, reject) => {
    if (generator.config.github.org) {
      generator.github.repos.getForOrg({ org: generator.config.github.org.login, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        generator.config.github.repos = res;
        return resolve();
      });
    } else {
      generator.github.repos.getForUser({ user: generator.config.github.username, page: '1', per_page: '100' }, (err, res) => {
        if (err) {
          return reject(err);
        }
        generator.config.github.repos = res;
        return resolve(resolve);
      });
    }
  });
}

function checkRepo(generator) {
  return new Promise((resolve, reject) => {
    let repository = (0, _lodash.find)(generator.config.github.repos, { name: generator.config.github.repository.name });
    if (repository) {
      console.log(_chalk2.default.bold.red('Repository already exists!'));
      return reject('Repository already exists!');
    }
    return resolve();
  });
}

function createRepository(generator) {
  return new Promise((resolve, reject) => {
    if (generator.config.github.org) {
      generator.github.repos.createForOrg({
        org: generator.config.github.org.login,
        name: generator.config.github.repository.name,
        description: generator.config.github.repository.description,
        private: generator.config.github.repository.private,
        license_template: generator.config.github.repository.license,
        auto_init: true
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        generator.config.github.repository = res;
        return resolve();
      });
    } else {
      generator.github.repos.create({
        name: generator.config.github.repository.name,
        description: generator.config.github.repository.description,
        private: generator.config.github.repository.private,
        license_template: generator.config.github.repository.license,
        auto_init: true
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        generator.config.github.repository = res;
        return resolve(generator);
      });
    }
  });
}