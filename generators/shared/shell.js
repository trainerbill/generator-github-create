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
exports.checkRemote = checkRemote;
exports.gitPull = gitPull;
exports.gitCommit = gitCommit;
exports.gitPush = gitPush;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsername() {
  return _shelljs2.default.exec('git config --get user.githubuser', { silent: true }).stdout.trim();
}

function saveEmail(email) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.email "' + email + '"', { silent: true });
  }
}

function saveName(name) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.name "' + name + '"', { silent: true });
  }
}

function saveUsername(username) {
  if (_shelljs2.default.which('git')) {
    return _shelljs2.default.exec('git config --global user.githubuser "' + username + '"', { silent: true });
  }
}

function gitInit(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git init', (code, stdout, stderr) => {
        return resolve();
      });
    }
  });
}

function gitRemote(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git remote add ' + config.name + ' ' + config.url, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
}

function gitRemotes() {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git remote -v', { silent: true }, (code, stdout, stderr) => {
        let remotes = stdout.split('\n');

        resolve(remotes);
      });
    }
  });
}

function checkRemote(name) {
  return new Promise((resolve, reject) => {
    gitRemotes().then(remotes => {
      //console.log(remotes);
      let regex = new RegExp('^' + name + '\t');
      remotes.forEach(remote => {
        if (regex.test(remote)) {
          console.log('Exists!!!!');
          resolve('Remote name already exists');
        }
      });
      resolve(true);
    });
  });
}

function gitPull(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git pull ' + config.gitinit.name + ' master', (code, stdout, stderr) => {
        resolve();
      });
    }
  });
}

function gitCommit(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git add -A && git commit -m "' + config.message + '"', (code, stdout, stderr) => {
        return resolve();
      });
    }
  });
}

function gitPush(config) {
  return new Promise((resolve, reject) => {
    if (_shelljs2.default.which('git')) {
      _shelljs2.default.exec('git push ' + (config.name === 'origin' ? '-u' : '') + ' ' + config.name + ' ' + config.branch, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
}