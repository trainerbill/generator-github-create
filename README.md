[![Join the chat at https://gitter.im/trainerbill][gitter-image]][gitter-url]&nbsp;[![npm version][npm-image]][npm-url]&nbsp;[![dependencies Status][david-image]][david-url]&nbsp;[![devDependencies Status][davidDev-image]][davidDev-url]&nbsp;[![Build Status][travis-image]][travis-url]&nbsp;[![Coverage Status][coveralls-image]][coveralls-url]&nbsp;

#generator-github-create
Yeoman generator for github authentication, create repository, README Badges, local git initialization, and local commit and push.

#Installation
```sh
$ npm install -g generator-github-create
```

#Features
* Multiple Github Accounts
* Token Authentication
* 2 Factor authentication (not tested.  Create an issue if it doesn't work)
* Organization Support
* Create remote repository
* Initialize local git
* Commit and push generated project to created repository
* Create README.md
* Create Badges on README.md

#Composability
> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)
You can use the following methods to composeWith

#Sub Generators
* yo github-create:authentication - Authenticate to github
* yo github-create:orgs - List the users orgs and let them choose
* yo github-create:create - Create the github repository, initialize git, push initial commit.
* yo github-create:readme - create readme / add badges

#Usage
To find usage you can run --help on the subgenerators
```sh
yo github-create:authenticate --help
```

#Example
Checkout the these generators to see how they all work together.
* https://github.com/modern-mean/generator-modern-mean/blob/master/src/generators/module/index.es6
* https://github.com/trainerbill/generator-github-create/blob/master/src/generators/app/index.es6


[gitter-image]: https://badges.gitter.im/trainerbill.svg
[gitter-url]: https://gitter.im/trainerbill?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[npm-image]: https://badge.fury.io/js/%40modern-mean%2Fgenerator-github-create.svg
[npm-url]: https://npmjs.org/package/%40modern-mean%2Fgenerator-github-create

[travis-image]: https://travis-ci.org/trainerbill/generator-github-create.svg?branch=master
[travis-url]: https://travis-ci.org/trainerbill/generator-github-create

[david-image]: https://david-dm.org/trainerbill/generator-github-create/status.svg
[david-url]: https://david-dm.org/trainerbill/generator-github-create

[davidDev-image]: https://david-dm.org/trainerbill/generator-github-create/dev-status.svg
[davidDev-url]: https://david-dm.org/trainerbill/generator-github-create?type=dev

[coveralls-image]: https://coveralls.io/repos/github/trainerbill/generator-github-create/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/trainerbill/generator-github-create?branch=master
