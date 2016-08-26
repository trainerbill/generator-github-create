'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializing = initializing;

var _shell = require('../shell');

var shell = _interopRequireWildcard(_shell);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function initializing(generator) {
  return new Promise((resolve, reject) => {
    generator.config.git.email = generator.user.git.email();
    generator.config.git.name = generator.user.git.name();
    generator.config.github.username = shell.getUsername();

    return resolve(generator);
  });
}