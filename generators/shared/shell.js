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
exports.gitCommit = gitCommit;
exports.gitPush = gitPush;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsername() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }

    _shelljs2.default.exec('git config --get user.githubuser', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(stdout.trim());
    });
  });
}

function saveEmail(email) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.email "' + email + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function saveName(name) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.name "' + name + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function saveUsername(username) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.githubuser "' + username + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitInit() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git init', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitRemote(config) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git remote add origin ' + config.urls[1], { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(config);
    });
  });
}

function gitCommit() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git add -A && git commit -m "Initial Commit"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitPush() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git push -u origin master', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}