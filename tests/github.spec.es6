import path from 'path';
import * as githubModule from '../src/generators/shared/github';
import GitHubApi from 'github';

let sandbox;

describe('generator-github-create:orgs', () => {

  beforeEach(() => {
    githubModule.init();
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    githubModule.destroy();
    return sandbox.restore();
  });

  describe('github.init', () => {

    it('should return an instance of node github', () => {
      return expect(githubModule.init() instanceof GitHubApi).to.equal(true);
    });

    it('should pass configuration to GitHubApi constructor', () => {
      let config = { debug: true };
      let g = githubModule.init(config);
      return g.config.debug.should.equal(true);
    });

  });

  describe('github.get', () => {

    it('should return instance of GitHubApi if inited', () => {
      return expect(githubModule.get() instanceof GitHubApi).to.equal(true);
    });

    it('should return undefined if not inited', () => {
      githubModule.destroy();
      return expect(githubModule.get()).to.equal(undefined);
    });

  });

  describe('github.destroy', () => {

    it('should destroy github instance', () => {
      githubModule.destroy();
      return expect(githubModule.get()).to.equal(undefined);
    });

  });

  describe('github.authenticate', () => {
    let stub;

    beforeEach(() => {
      stub = sandbox.stub(githubModule.get(), 'authenticate');
      return githubModule.authenticate('testuser', 'testpassword');
    });

    it('should call github.autheticate with user/pass and basic auth', () => {
      return stub.should.have.been.calledWith({
        type: 'basic',
        username: 'testuser',
        password: 'testpassword'
      });
    });

  });

  describe('github.getAuthorization', () => {
    let stub,
      authorization,
      found;

    describe('error', () => {

      beforeEach(() => {
        authorization = { id: 'testid' };
        stub = sandbox.stub(githubModule.get().authorization, 'getAll').yields('error', null);
      });

      it('should reject the promise with error', () => {
        return githubModule.getAuthorization(authorization).should.have.been.rejectedWith('error');
      });

    });

    describe('success', () => {

      beforeEach(() => {
        authorization = { app: { name: 'testname' } };
        stub = sandbox.stub(githubModule.get().authorization, 'getAll').yields(null, [authorization]);
        return githubModule.getAuthorization({ appName: 'testname' })
          .then(auth => {
            found = auth;
          });
      });

      it('should call github.authorization.getAll', () => {
        return stub.should.have.been.calledWith({ page: '1', per_page: '100' });
      });

      it('should resolve the authorization', () => {
        return found.should.equal(authorization);
      });

    });

    describe('not found', () => {

      beforeEach(() => {
        authorization = { app: { name: 'testname' } };
        stub = sandbox.stub(githubModule.get().authorization, 'getAll').yields(null, [authorization]);
        return githubModule.getAuthorization({ appName: 'testname2' })
          .then(auth => {
            found = auth;
          });
      });

      it('should resolve the authorization', () => {
        return expect(found).to.equal(undefined);
      });

    });

  });

  describe('github.deleteAuthorization', () => {
    let stub,
      authorization;

    describe('success', () => {

      beforeEach(() => {
        authorization = { id: 'testid' };
        stub = sandbox.stub(githubModule.get().authorization, 'delete').yields(null, null);
        return githubModule.deleteAuthorization(authorization);
      });

      it('should call github.authorization.delete', () => {
        return stub.should.have.been.calledWith(authorization);
      });

    });

    describe('error', () => {

      beforeEach(() => {
        authorization = { id: 'testid' };
        stub = sandbox.stub(githubModule.get().authorization, 'delete').yields('error', null);
      });

      it('should reject the promise with error', () => {
        return githubModule.deleteAuthorization(authorization).should.have.been.rejectedWith('error');
      });

    });

    describe('no authorization', () => {

      beforeEach(() => {
        authorization = { id: 'testid' };
        stub = sandbox.stub(githubModule.get().authorization, 'delete').yields(null, null);
        return githubModule.deleteAuthorization();
      });

      it('should not call github.authorization.delete', () => {
        return stub.should.not.have.been.called;
      });

    });

  });

  describe('github.createAuthorization', () => {
    let stub,
      authorization,
      setup;

    describe('success', () => {

      beforeEach(() => {
        setup = {
          scopes: 'scope, scope1',
          appName: 'testname',
          appUrl: 'noteurl'
        };
        stub = sandbox.stub(githubModule.get().authorization, 'create').yields(null, null);
        return githubModule.createAuthorization(setup);
      });

      it('should call github.authorization.create', () => {
        return stub.should.have.been.calledWith({
          scopes: 'scope, scope1',
          note: 'testname',
          note_url: 'noteurl'
        });
      });

    });

    describe('success twofactor', () => {

      beforeEach(() => {
        setup = {
          scopes: 'scope, scope1',
          appName: 'testname',
          appUrl: 'noteurl'
        };
        stub = sandbox.stub(githubModule.get().authorization, 'create').yields(null, null);
        return githubModule.createAuthorization(setup, '2factortoken');
      });

      it('should call github.authorization.create', () => {
        return stub.should.have.been.calledWith({
          scopes: 'scope, scope1',
          note: 'testname',
          note_url: 'noteurl',
          headers: {
            'X-GitHub-OTP': '2factortoken'
          }
        });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        setup = {
          scopes: 'scope, scope1',
          appName: 'testname',
          appUrl: 'noteurl'
        };
        stub = sandbox.stub(githubModule.get().authorization, 'create').yields('error', null);
      });

      it('should reject the promise with error', () => {
        return githubModule.createAuthorization(setup).should.have.been.rejectedWith('error');
      });

    });

  });

  describe('github.getOrgs', () => {
    let stub,
      orgs,
      response;

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(githubModule.get().users, 'getOrgs').yields('error', null);
      });

      it('should reject the promise with error', () => {
        return githubModule.getOrgs().should.have.been.rejectedWith('error');
      });

    });

    describe('success', () => {

      beforeEach(() => {
        orgs = [{ login: 'test' }, { login: 'test2' }];
        stub = sandbox.stub(githubModule.get().users, 'getOrgs').yields(null, orgs);
        return githubModule.getOrgs()
          .then(orgs => {
            response = orgs;
          });
      });

      it('should call github.users.getOrgs', () => {
        return stub.should.have.been.calledWith({ page: '1', per_page: '100' });
      });

      it('should resolve the orgs', () => {
        return response.should.equal(orgs);
      });

    });

  });

  describe('github.getRepos', () => {
    let stub,
      repos,
      response;

    describe('for orgs', () => {

      describe('error', () => {

        beforeEach(() => {
          stub = sandbox.stub(githubModule.get().repos, 'getForOrg').yields('error', null);
        });

        it('should reject the promise with error', () => {
          return githubModule.getRepos({ org: 'testorg' }).should.have.been.rejectedWith('error');
        });

      });

      describe('success', () => {

        beforeEach(() => {
          repos = [{ name: 'test' }, { name: 'test2' }];
          stub = sandbox.stub(githubModule.get().repos, 'getForOrg').yields(null, repos);
          return githubModule.getRepos({ org: 'testorg' })
            .then(repos => {
              response = repos;
            });
        });

        it('should call github.users.getForOrg', () => {
          return stub.should.have.been.calledWith({ org: 'testorg', page: '1', per_page: '100' });
        });

        it('should resolve the repos', () => {
          return response.should.equal(repos);
        });

      });

    });

    describe('for user', () => {

      describe('error', () => {

        beforeEach(() => {
          stub = sandbox.stub(githubModule.get().repos, 'getForUser').yields('error', null);
        });

        it('should reject the promise with error', () => {
          return githubModule.getRepos({ user: 'testuser' }).should.have.been.rejectedWith('error');
        });

      });

      describe('success', () => {

        beforeEach(() => {
          repos = [{ name: 'test' }, { name: 'test2' }];
          stub = sandbox.stub(githubModule.get().repos, 'getForUser').yields(null, repos);
          return githubModule.getRepos({ user: 'testuser' })
            .then(repos => {
              response = repos;
            });
        });

        it('should call github.users.getForUser', () => {
          return stub.should.have.been.calledWith({ user: 'testuser', page: '1', per_page: '100' });
        });

        it('should resolve the repos', () => {
          return response.should.equal(repos);
        });

      });

    });

  });

  describe('github.createRepository', () => {
    let stub,
      repository,
      rrepo,
      response;

    describe('for orgs', () => {

      describe('error', () => {

        beforeEach(() => {
          repository = { org: 'testorg', name: 'test-repository', description: 'Test Repository', private: false, license: 'license', autoinit: false };
          stub = sandbox.stub(githubModule.get().repos, 'createForOrg').yields('error', null);
        });

        it('should reject the promise with error', () => {
          return githubModule.createRepository(repository).should.have.been.rejectedWith('error');
        });

      });

      describe('success', () => {

        beforeEach(() => {
          repository = { org: 'testorg', name: 'test-repository', description: 'Test Repository', private: false, license: 'license', autoinit: false };
          rrepo = { html_url: 'https://test', ssh_url: 'git@test' };
          stub = sandbox.stub(githubModule.get().repos, 'createForOrg').yields(null, rrepo);
          return githubModule.createRepository(repository)
            .then(repos => {
              response = repos;
            });
        });

        it('should call github.users.getForOrg', () => {
          return stub.should.have.been.calledWith({ org: 'testorg', name: 'test-repository', description: 'Test Repository', private: false, license_template: 'license', auto_init: false });
        });

        it('should resolve the repo', () => {
          return response.should.equal(rrepo);
        });

      });

    });

    describe('for user', () => {

      describe('error', () => {

        beforeEach(() => {
          repository = { name: 'test-repository', description: 'Test Repository', private: false, license: 'license', autoinit: false };
          stub = sandbox.stub(githubModule.get().repos, 'create').yields('error', null);
        });

        it('should reject the promise with error', () => {
          return githubModule.createRepository(repository).should.have.been.rejectedWith('error');
        });

      });

      describe('success', () => {

        beforeEach(() => {
          repository = { name: 'test-repository', description: 'Test Repository', private: false, license: 'license', autoinit: false };
          rrepo = { html_url: 'https://test', ssh_url: 'git@test' };
          stub = sandbox.stub(githubModule.get().repos, 'create').yields(null, rrepo);
          return githubModule.createRepository(repository)
            .then(repos => {
              response = repos;
            });
        });

        it('should call github.users.getForOrg', () => {
          return stub.should.have.been.calledWith({ name: 'test-repository', description: 'Test Repository', private: false, license_template: 'license', auto_init: false });
        });

        it('should resolve the repo', () => {
          return response.should.equal(rrepo);
        });

      });
    });

  });

});
