import { find } from 'lodash';
import chalk from 'chalk';

export function authenticate(generator) {
  return new Promise((resolve, reject) => {
    generator.github.authenticate({
      type: 'basic',
      username: generator.config.github.username,
      password: generator.config.github.password
    });
    return resolve(generator);
  });
}

export function getAuthorization(generator) {
  return new Promise((resolve, reject) => {
    generator.github.authorization.getAll({ page: '1', per_page: '100' }, (err, auths) => {
      if (err) {
        return reject(err);
      }
      generator.config.github.authorization.current = find(auths, { app: { name: generator.config.github.authorization.name } }) || undefined;
      return resolve(generator);
    });
  });
}

export function deleteAuthorization(generator) {
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

export function createAuthorization (generator) {
  return new Promise((resolve, reject) => {
    generator.github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: generator.config.github.authorization.name,
      note_url: 'https://github.com/modern-mean/generator-git',
      headers: {
        'X-GitHub-OTP': 'two-factor-code'
      }
    }, (err, res) => {
      if(err) {
        return reject(err);
      }
      generator.config.github.authorization.token = res.token;
      return resolve(generator);
    });
  });
}

export function getOrgs(generator) {
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

export function getRepos(generator) {
  return new Promise((resolve, reject) => {
    if(generator.config.github.org) {
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

export function checkRepo(generator) {
  return new Promise((resolve, reject) => {
    let repository = find(generator.config.github.repos, { name: generator.config.github.repository.name });
    if (repository) {
      console.log(chalk.bold.red('Repository already exists!'));
      return reject('Repository already exists!');
    }
    return resolve();
  });
}

export function createRepository(generator) {
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
