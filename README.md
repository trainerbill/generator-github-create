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
* github-create:authentication - Authenticate to github
* github-create:orgs - List the users orgs and let them choose
* github-create:create - Create the github repository
* github-create:gitinit - Initialize local git, add remote, pull
* github-create:gitpush - Commit and push generated project
* github-create:readme - create readme / add badges

#Usage
To find usage you can run --help on the subgenerators
```sh
yo github-create:authenticate --help
```

#Example
Checkout the main generator to see how they all work together.
https://github.com/trainerbill/generator-github-create/blob/master/src/generators/app/index.es6
