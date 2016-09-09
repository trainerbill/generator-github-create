<% if (badges.indexOf('gitter') !== -1) { %>[![Join the chat at https://gitter.im/<%= profile %>][gitter-image]][gitter-url]&nbsp;<% } %><% if (badges.indexOf('npm') !== -1) { %>[![npm version][npm-image]][npm-url]&nbsp;<% } %><% if (badges.indexOf('david') !== -1) { %>[![dependencies Status][david-image]][david-url]&nbsp;<% } %><% if (badges.indexOf('davidDev') !== -1) { %>[![devDependencies Status][davidDev-image]][davidDev-url]&nbsp;<% } %><% if (badges.indexOf('travis') !== -1) { %>[![Build Status][travis-image]][travis-url]&nbsp;<% } %><% if (badges.indexOf('coveralls') !== -1) { %>[![Coverage Status][coveralls-image]][coveralls-url]&nbsp;<% } %>

#<%= title %>
<%= description %>

#Installation
```sh
$ npm install --save <%= scoped || repository %>
```

[gitter-image]: https://badges.gitter.im/<%= profile %>.svg
[gitter-url]: https://gitter.im/<%= profile %>?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[npm-image]: https://badge.fury.io/js/<%= scopedEncoded || repository %>.svg
[npm-url]: https://npmjs.org/package/<%= scopedEncoded || repository %>

[travis-image]: https://travis-ci.org/<%= profile %>/<%= repository %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= profile %>/<%= repository %>

[david-image]: https://david-dm.org/<%= profile %>/<%= repository %>/status.svg
[david-url]: https://david-dm.org/<%= profile %>/<%= repository %>

[davidDev-image]: https://david-dm.org/<%= profile %>/<%= repository %>/dev-status.svg
[davidDev-url]: https://david-dm.org/<%= profile %>/<%= repository %>?type=dev

[coveralls-image]: https://coveralls.io/repos/github/<%= profile %>/<%= repository %>/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/<%= profile %>/<%= repository %>?branch=master
