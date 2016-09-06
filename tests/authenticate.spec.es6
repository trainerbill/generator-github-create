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

  describe('Default', () => {
    let authenticateStub,
      getAuthorizationStub,
      deleteAuthorizationStub,
      createAuthorizationStub,
      saveUsernameStub,
      getUsernameStub;
    beforeEach(() => {
      authenticateStub = sandbox.stub(github, 'authenticate').resolves();
      getAuthorizationStub = sandbox.stub(github, 'getAuthorization').resolves();
      deleteAuthorizationStub = sandbox.stub(github, 'deleteAuthorization').resolves();
      createAuthorizationStub = sandbox.stub(github, 'createAuthorization').resolves();
      saveUsernameStub = sandbox.stub(shell, 'saveUsername').resolves(true);
      getUsernameStub = sandbox.stub(shell, 'getUsername').resolves('testyok');
      return helpers.run(path.join(__dirname, authenticate.src))
        .withPrompts(authenticate.prompts)
        .toPromise();
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', authenticate.save);
    });

    it('should not save the password', () => {
      return assert.noFileContent('.yo-rc.json', /testpassword/);
    });

  });


});
