'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.init = init;

var _github = require('../github');

var _shell = require('../shell');

var shell = _interopRequireWildcard(_shell);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function install(generator) {
  if (generator.config.confirm) {
    return (0, _github.createRepository)(generator).then(() => init(generator));
  }
}

function init(generator) {
  return new Promise((reject, resolve) => {

    if (!generator.config.init.init) {
      return resolve();
    }
    shell.gitInit();
    if (!generator.config.init.remote) {
      return resolve();
    }
    shell.gitRemote(generator.config.init.type === 'ssh' ? generator.config.github.repository.ssh_url : generator.config.github.repository.svn_url);
    if (!generator.config.init.pull) {
      return resolve();
    }
    shell.gitPull();

    return resolve();
  });
}