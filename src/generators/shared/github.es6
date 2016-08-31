import { find } from 'lodash';
import chalk from 'chalk';
import GitHubApi from 'github';

let github;

export function init(config) {
  return github = new GitHubApi(config);
}

export function get() {
  return github;
}

export function authenticate(user, pass) {
  return new Promise((resolve, reject) => {
    github.authenticate({
      type: 'basic',
      username: user,
      password: pass
    });
    return resolve(github);
  });
}

export function getAuthorization(config) {
  return new Promise((resolve, reject) => {
    github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      let authorization = find(auths, { app: { name: config.appName } }) || undefined;
      return resolve(authorization);
    });
  });
}

export function deleteAuthorization(authorization) {
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

export function createAuthorization (config, twofactorcode) {
  return new Promise((resolve, reject) => {
    let setup = {
      scopes: config.scopes,
      note: config.appName,
      note_url: config.appUrl
    };

    if (twofactorcode) {
      setup.headers = {
        'X-GitHub-OTP': config.twofactorcode
      };
    }

    github.authorization.create(setup, (err, res) => {
      if(err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

export function getOrgs() {
  return new Promise((resolve, reject) => {
    github.users.getOrgs({ page: '1', per_page: '100' }, (err, orgs) => {
      if (err) {
        return reject(err);
      }

      return resolve(orgs);
    });
  });
}

export function getRepos(config) {
  return new Promise((resolve, reject) => {
    if(config.org) {
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

export function checkRepo() {
  return new Promise((resolve, reject) => {
    let repository = find(generator.repos, { name: generator.config.get('repo').name });
    if (repository) {
      console.log(repository);
      return reject(repository.name + ' already exists!');
    }
    return resolve();
  });
}

export function createRepository(config) {
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
