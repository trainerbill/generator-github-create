#Introduction
Creates a github repository using Github apis.

#Features
* Default lookup based on git config
* Multiple Github Accounts
* Token Authentication
* Organization Support

#Composability
> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)
You can use the following methods to composeWith

#Sub Generators
* github-create:authentication - Authenticate to github
* github-create:orgs - List the users orgs and let them choose
* github-create:create - Create the github repository
* github-create:git - Initialize local git, add remote, pull and push.

#Example
Checkout the main generator to see how they all work together.
https://github.com/trainerbill/generator-github-create/blob/master/src/generators/app/index.es6
