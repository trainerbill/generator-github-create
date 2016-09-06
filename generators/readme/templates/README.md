<% if (badges.indexOf('gitter') !== -1) { %>[![Join the chat at https://gitter.im/<%= profile %>](https://badges.gitter.im/<%= profile %>.svg)](https://gitter.im/<%= profile %>?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)&nbsp;<% } %><% if (badges.indexOf('npm') !== -1) { %>[![npm version](https://badge.fury.io/js/<%= profile %>.svg)](https://badge.fury.io/js/<%= profile %>)&nbsp;<% } %><% if (badges.indexOf('david') !== -1) { %>[![dependencies Status](https://david-dm.org/<%= profile %>/<%= repository %>/status.svg)](https://david-dm.org/<%= profile %>/<%= repository %>)&nbsp;<% } %><% if (badges.indexOf('davidDev') !== -1) { %>[![devDependencies Status](https://david-dm.org/<%= profile %>/<%= repository %>/dev-status.svg)](https://david-dm.org/<%= profile %>/<%= repository %>?type=dev)&nbsp;<% } %><% if (badges.indexOf('travis') !== -1) { %>[![Build Status](https://travis-ci.org/<%= profile %>/<%= repository %>.svg?branch=master)](https://travis-ci.org/<%= profile %>/<%= repository %>)&nbsp;<% } %><% if (badges.indexOf('coveralls') !== -1) { %>[![Coverage Status](https://coveralls.io/repos/github/<%= profile %>/<%= repository %>/badge.svg?branch=master)](https://coveralls.io/github/<%= profile %>/<%= repository %>?branch=master)&nbsp;<% } %>

#<%= title %>
<%= description %>

#Installation
```sh
$ npm install --save <%= repository %>
```
