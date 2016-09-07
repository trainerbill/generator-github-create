[![Join the chat at https://gitter.im/modern-mean](https://badges.gitter.im/modern-mean.svg)](https://gitter.im/modern-mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)&nbsp;[![npm version](https://badge.fury.io/js/generator-github-create.svg)](https://badge.fury.io/js/generator-github-create)&nbsp;[![dependencies Status](https://david-dm.org/trainerbill/generator-github-create/status.svg)](https://david-dm.org/trainerbill/generator-github-create)&nbsp;[![devDependencies Status](https://david-dm.org/trainerbill/generator-github-create/dev-status.svg)](https://david-dm.org/trainerbill/generator-github-create?type=dev)&nbsp;[![Build Status](https://travis-ci.org/trainerbill/generator-github-create.svg?branch=master)](https://travis-ci.org/trainerbill/generator-github-create)&nbsp;[![Coverage Status](https://coveralls.io/repos/github/trainerbill/generator-github-create/badge.svg?branch=master)](https://coveralls.io/github/trainerbill/generator-github-create?branch=master)

#Introduction
Creates a github repository using Github apis.  <b>This generator does not store github password and does not delete repositories for good reason</b>

#Install
```sh
npm install -g generator-github-create
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
Checkout the main generator to see how they all work together.
https://github.com/trainerbill/generator-github-create/blob/master/src/generators/app/index.es6
