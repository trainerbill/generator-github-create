'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orgs = orgs;
function orgs(orgs) {
  let choices = orgs.map(function (item) {
    return item.login;
  });
  return [{
    when: answers => {
      return orgs.length;
    },
    type: 'confirm',
    name: 'use',
    message: 'Will this repository be part of an organization you belong to?',
    store: true
  }, {
    when: answers => {
      return answers.use;
    },
    type: 'list',
    name: 'org',
    message: 'Select your organization',
    choices: choices,
    store: true
  }];
}