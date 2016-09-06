import path from 'path';
import * as github from '../src/generators/shared/github';
import { create } from './config';
import * as shell from '../src/generators/shared/shell';

let sandbox;

describe('generator-github-create:create', () => {

  beforeEach(() => {
    github.init();
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    github.destroy();
    return sandbox.restore();
  });

  describe('Default', () => {

    let getOrgsStub,
      getReposStub,
      createRepositoryStub;

    beforeEach(() => {
      getOrgsStub = sandbox.stub(github, 'getOrgs').resolves([{ login: 'org1' }, { login: 'org2' }]);
      getReposStub = sandbox.stub(github, 'getRepos').resolves([{ name: 'repo1' }, { name: 'repo2' }]);
      createRepositoryStub = sandbox.stub(github, 'createRepository').resolves({ html_url: 'https://test', ssh_url: 'git@test' });
      return helpers.run(path.join(__dirname, create.src))
        .withGenerators(create.deps)
        .withPrompts(create.prompts)
        .withOptions(create.options)
        .toPromise()
        .catch(err => {
          console.log(err);
        });
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', create.save);
    });

  });

  describe('Skip prompt', () => {

    let getOrgsStub,
      createRepositoryStub;

    beforeEach(() => {
      create.options['skip-prompt'] = true;
      getOrgsStub = sandbox.stub(github, 'getOrgs').resolves([{ name: 'repo1' }, { name: 'repo2' }]);
      createRepositoryStub = sandbox.stub(github, 'createRepository').resolves({ html_url: 'https://test', ssh_url: 'git@test' });
      return helpers.run(path.join(__dirname, create.src))
        .withGenerators(create.deps)
        .withOptions(create.options)
        .toPromise();
    });

    afterEach(() => {
      create.options['skip-prompt'] = false;
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', create.save);
    });

  });


});
