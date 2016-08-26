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
exports.gitPull = gitPull;

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

function gitInit() {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git init', { silent: true });
  }
};

function gitRemote(url) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git remote add origin ' + url, { silent: true });
  }
};

function gitPull(url) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git pull -u origin master', { silent: true });
  }
};