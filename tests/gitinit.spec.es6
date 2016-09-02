import path from 'path';
import * as github from '../src/generators/shared/github';
import { gitinit } from './config';
import * as shell from '../src/generators/shared/shell';

let sandbox;

describe('generator-github-create:gitinit', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('Default', () => {

    let initStub,
      remoteStub,
      pullStub;

    beforeEach(() => {

      initStub = sandbox.stub(shell, 'gitInit').resolves();
      remoteStub = sandbox.stub(shell, 'gitRemote').resolves();
      pullStub = sandbox.stub(shell, 'gitPull').resolves();

      return helpers.run(path.join(__dirname, gitinit.src))
        .withPrompts(gitinit.prompts)
        .withArguments(['sure', 'thing'])
        .toPromise();
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', gitinit.save);
    });

    it('should call shell.gitInit', () => {
      return initStub.should.have.been.called;
    });

    it('should call shell.gitRemote', () => {
      return remoteStub.should.have.been.called;
    });

    it('should call shell.gitPull', () => {
      return pullStub.should.have.been.called;
    });

  });

  describe('Skip Prompt', () => {

    let initStub,
      remoteStub,
      pullStub;

    beforeEach(() => {
      initStub = sandbox.stub(shell, 'gitInit').resolves();
      remoteStub = sandbox.stub(shell, 'gitRemote').resolves();
      pullStub = sandbox.stub(shell, 'gitPull').resolves();
      gitinit.options['skip-prompt'] = true;
      return helpers.run(path.join(__dirname, gitinit.src))
        .withOptions(gitinit.options)
        .withArguments(['testurl'])
        .toPromise();
    });

    afterEach(() => {
      gitinit.options['skip-prompt'] = false;
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', gitinit.save);
    });

    it('should call shell.gitInit', () => {
      return initStub.should.have.been.called;
    });

    it('should call shell.gitRemote', () => {
      return remoteStub.should.have.been.called;
    });

    it('should call shell.gitPull', () => {
      return pullStub.should.have.been.called;
    });

  });


});
