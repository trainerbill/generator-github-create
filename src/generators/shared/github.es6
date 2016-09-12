import { find } from 'lodash';
import chalk from 'chalk';
import GitHubApi from 'github';

let github;

export function init(config) {
  return github = new GitHubApi(config);
}

export function destroy() {
  return github = undefined;
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

export function getAuthorization(appName) {
  return new Promise((resolve, reject) => {
    github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      let authorization = find(auths, { app: { name: appName } }) || undefined;
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
    github.authorization.create({
      scopes: config.scopes.split(',').map(item => item.trim()),
      note: config.appName,
      note_url: config.appUrl,
      headers: twofactorcode ? { 'X-GitHub-OTP': twofactorcode } : undefined
    }, (err, res) => {
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

export function createRepository(config) {
  return new Promise((resolve, reject) => {
    if (config.org) {
      github.repos.createForOrg({
        org: config.org,
        name: config.name,
        description: config.description,
        private: config.private,
        auto_init: false
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
        auto_init: false
      }, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
}
