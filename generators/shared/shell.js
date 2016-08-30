'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsername = getUsername;
exports.saveEmail = saveEmail;
exports.saveName = saveName;
exports.saveUsername = saveUsername;
exports.gitInit = gitInit;
exports.gitRemote = gitRemote;
exports.gitRemotes = gitRemotes;
exports.gitPull = gitPull;
exports.gitCommit = gitCommit;
exports.gitPush = gitPush;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsername() {
  return _shelljs2.default.exec('git config --get user.githubuser', { silent: true }).stdout.trim();
};

function saveEmail(email) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.email "' + email + '"', { silent: true });
  }
};

function saveName(name) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.name "' + name + '"', { silent: true });
  }
};

function saveUsername(username) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.githubuser "' + username + '"', { silent: true });
  }
};

function gitInit(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git init', { silent: true }, (code, stdout, stderr) => {
        return resolve();
      });
    }
  });
};

function gitRemote(config) {
  if (!config.remote) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git remote add ' + config.remote + ' ' + config.url, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};

function gitRemotes() {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git remote -v', { silent: true }, (code, stdout, stderr) => {
        let remotes = stdout.split('\n');

        resolve(remotes);
      });
    }
  });
};

function gitPull(config) {
  if (!config.pull) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git pull origin master', (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};

function gitCommit(config) {
  if (!config.commit) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git add -A && git commit -m ' + config.message, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};

function gitPush(config) {
  if (!config.pull) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git push origin master', (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};