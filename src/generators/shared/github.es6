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

export function createAuthorization (appName, appUrl) {
  return new Promise((resolve, reject) => {
    github.authorization.create(
      {
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: appName,
        note_url: appUrl,
        headers: {
          'X-GitHub-OTP': 'two-factor-code'
        }
      },
      (err, res) => {
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

export function getRepos(authenticate, orgs) {
  return new Promise((resolve, reject) => {
    if(orgs.org) {
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

export function checkRepo() {
  return new Promise((resolve, reject) => {
    let repository = find(generator.repos, { name: generator.config.get('repo').name });
    if (repository) {
      console.log(chalk.bold.red('Repository already exists!'));
      return reject('Repository already exists!');
    }
    return resolve();
  });
}

export function createRepository(repository, orgs) {
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
