import path from 'path';
import * as github from '../src/generators/shared/github';
import { create } from './config';
import * as shell from '../src/generators/shared/shell';

let sandbox;

let getOrgsStub,
  getReposStub,
  createRepositoryStub,
  gitInitStub,
  gitRemoteStub,
  gitCommitStub,
  gitPushStub;

describe('generator-github-create:create', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    //Setup stubs
    getOrgsStub = sandbox.stub(github, 'getOrgs').resolves([{ login: 'org1' }, { login: 'org2' }]);
    getReposStub = sandbox.stub(github, 'getRepos').resolves([{ name: 'repo1' }, { name: 'repo2' }]);
    createRepositoryStub = sandbox.stub(github, 'createRepository').resolves({ html_url: 'https://test', ssh_url: 'git@test' });
    gitInitStub = sandbox.stub(shell, 'gitInit').resolves(create.prompts);
    gitRemoteStub = sandbox.stub(shell, 'gitRemote').resolves();
    gitCommitStub = sandbox.stub(shell, 'gitCommit').resolves();
    gitPushStub = sandbox.stub(shell, 'gitPush').resolves();
    return github.init();
  });

  afterEach(() => {
    sandbox.restore();
    return github.destroy();
  });

  describe('Default', () => {

    beforeEach(() => {
      return helpers.run(path.join(__dirname, create.src))
        .withPrompts(create.prompts)
        .withOptions({ username: 'testuser' })
        .toPromise();
    });

    it('should call github.getOrgs', () => {
      return getOrgsStub.should.have.been.called;
    });

    it('should call github.getRepos', () => {
      return getReposStub.should.have.been.called;
    });

    it('should call github.createRepository', () => {
      return createRepositoryStub.should.have.been.calledWith(sinon.match(create.prompts));
    });

    it('should call shell.gitInit', () => {
      return gitInitStub.should.have.been.called;
    });

    it('should call shell.gitRemote', () => {
      return gitRemoteStub.should.have.been.calledWith(sinon.match(create.prompts));
    });

    it('should call shell.gitCommit', () => {
      return gitCommitStub.should.have.been.called;
    });

    it('should call shell.gitPush', () => {
      return gitPushStub.should.have.been.called;
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', create.config);
    });

    it('should write to package.json', () => {
      return assert.jsonFileContent('package.json', { repository: { type: 'git', url: 'git@test' }, bugs: { url: 'https://test/issues' }, homepage: 'https://test#readme' });
    });

  });

  describe('With Org', () => {
    let prompts;
    beforeEach(() => {
      prompts = create.prompts;
      prompts.useOrg = true;
      prompts.org = 'testorg';
      return helpers.run(path.join(__dirname, create.src))
        .withPrompts(prompts)
        .withOptions({ username: 'testuser' })
        .toPromise();
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', create.config);
    });

    it('should generate a config file with org config', () => {
      return assert.fileContent('.yo-rc.json', '"useOrg": true');
    });

    it('should generate a config file with org config', () => {
      return assert.fileContent('.yo-rc.json', '"org": "testorg"');
    });

  });

  describe('No init', () => {
    let prompts;
    beforeEach(() => {
      prompts = create.prompts;
      prompts.init = false;
      return helpers.run(path.join(__dirname, create.src))
        .withPrompts(prompts)
        .withOptions({ username: 'testuser' })
        .toPromise();
    });

    it('should not call shell.gitInit', () => {
      return gitInitStub.should.not.have.been.called;
    });

    it('should not call shell.gitRemote', () => {
      return gitRemoteStub.should.not.have.been.called;
    });

    it('should not call shell.gitCommit', () => {
      return gitCommitStub.should.not.have.been.called;
    });

    it('should not call shell.gitPush', () => {
      return gitPushStub.should.not.have.been.called;
    });

  });

});
