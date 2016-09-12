import path from 'path';
import * as github from '../src/generators/shared/github';
import { authenticate } from './config';
import * as shell from '../src/generators/shared/shell';

let sandbox;

describe('generator-github-create:authenticate', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('with all prompts', () => {
    let authenticateStub,
      getAuthorizationStub,
      deleteAuthorizationStub,
      createAuthorizationStub,
      saveUsernameStub,
      getUsernameStub;
    beforeEach(() => {
      authenticateStub = sandbox.stub(github, 'authenticate').resolves();
      getAuthorizationStub = sandbox.stub(github, 'getAuthorization').resolves({ name: 'test' });
      deleteAuthorizationStub = sandbox.stub(github, 'deleteAuthorization').resolves();
      createAuthorizationStub = sandbox.stub(github, 'createAuthorization').resolves();
      saveUsernameStub = sandbox.stub(shell, 'saveUsername').resolves(true);
      getUsernameStub = sandbox.stub(shell, 'getUsername').resolves('testyok');
      return helpers.run(path.join(__dirname, authenticate.src))
        .withPrompts(authenticate.prompts)
        .toPromise();
    });

    it('should call github.authenticate with username and password', () => {
      return authenticateStub.should.have.been.calledWith(authenticate.prompts.username, authenticate.prompts.password);
    });

    it('should call github.getAuthorization with appName and twofactorcode', () => {
      return getAuthorizationStub.should.have.been.calledWith(authenticate.options.appName);
    });

    it('should call github.deleteAuthorization with resolve from getAuthorization', () => {
      return deleteAuthorizationStub.should.have.been.calledWith({ name: 'test' });
    });

    it('should call github.createAuthorization with setup information', () => {
      return createAuthorizationStub.should.have.been.calledWith({ appName: authenticate.options.appName, appUrl: authenticate.options.appUrl, scopes: authenticate.options.scopes }, authenticate.prompts.twofactorcode);
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', authenticate.config);
    });

    it('should not save the password', () => {
      return assert.noFileContent('.yo-rc.json', /testpassword/);
    });

    it('should not save the two factor code', () => {
      return assert.noFileContent('.yo-rc.json', /twofactorcode/);
    });

  });


});
