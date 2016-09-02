import path from 'path';
import { gitpush } from './config';
import * as shell from '../src/generators/shared/shell';

let sandbox;

describe('generator-github-create:gitpush', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('Default', () => {

    let commitStub,
      pushStub;

    beforeEach(() => {

      commitStub = sandbox.stub(shell, 'gitCommit').resolves();
      pushStub = sandbox.stub(shell, 'gitPush').resolves();

      return helpers.run(path.join(__dirname, gitpush.src))
        .withPrompts(gitpush.prompts)
        .toPromise();
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', gitpush.save);
    });

    it('should call shell.gitCommit', () => {
      return commitStub.should.have.been.called;
    });

    it('should call shell.gitPush', () => {
      return pushStub.should.have.been.called;
    });

  });

  describe('Skip Prompt', () => {

    let commitStub,
      pushStub;

    beforeEach(() => {
      gitpush.options['skip-prompt'] = true;
      commitStub = sandbox.stub(shell, 'gitCommit').resolves();
      pushStub = sandbox.stub(shell, 'gitPush').resolves();

      return helpers.run(path.join(__dirname, gitpush.src))
        .withOptions(gitpush.options)
        .toPromise();
    });

    afterEach(() => {
      gitpush.options['skip-prompt'] = false;
    });


    it('should call shell.gitCommit', () => {
      return commitStub.should.have.been.called;
    });

    it('should call shell.gitPush', () => {
      return pushStub.should.have.been.called;
    });

  });


});
