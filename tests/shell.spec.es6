import path from 'path';
import * as shellModule from '../src/generators/shared/shell';
import shell from 'shelljs';

let sandbox;

describe('shared/shell.es6', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('shell.getUsername', () => {

    let stub;

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'testout', null);
      });

      it('should call shell.exec', () => {
        shellModule.getUsername();
        return stub.should.have.been.calledWith('git config --get user.githubuser', { silent: true });
      });

      it('should trim and return a username', () => {
        return shellModule.getUsername().should.eventually.equal('testout');
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.getUsername().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.getUsername().should.be.rejectedWith('This script requires local git installed!');
      });

    });



  });

  describe('shell.saveEmail', () => {

    let stub,
      email;

    describe('success', () => {

      beforeEach(() => {
        email = 'test@awesome.com';
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with passed email', () => {
        shellModule.saveEmail(email);
        return stub.should.have.been.calledWith('git config --global user.email "' + email + '"', { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.saveEmail(email).should.be.fulfilled;
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.saveEmail().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.saveEmail().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.saveName', () => {

    let stub,
      name;

    describe('success', () => {

      beforeEach(() => {
        name = 'Test Me';
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with passed email', () => {
        shellModule.saveName(name);
        return stub.should.have.been.calledWith('git config --global user.name "' + name + '"', { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.saveName(name).should.be.fulfilled;
      });

    });


    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.saveName().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.saveName().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.saveUsername', () => {

    let stub,
      username;

    describe('success', () => {

      beforeEach(() => {
        username = 'testy';
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with passed email', () => {
        shellModule.saveUsername(username);
        return stub.should.have.been.calledWith('git config --global user.githubuser "' + username + '"', { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.saveUsername(username).should.be.fulfilled;
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.saveUsername().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.saveUsername().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitInit', () => {

    let stub;

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec git init', () => {
        shellModule.gitInit({ init: true });
        return stub.should.have.been.calledWith('git init', { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.gitInit({ init: true }).should.be.fulfilled;
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitInit({ init: true }).should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitInit({ init: true }).should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitRemote', () => {

    let stub,
      config = {
        init: true,
        urls: ['test', 'testurl']
      };

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec git remote add', () => {
        shellModule.gitRemote(config);
        return stub.should.have.been.calledWith('git remote add origin ' + config.urls[1], { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.gitRemote(config).should.be.fulfilled;
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitRemote(config).should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitRemote(config).should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitCommit', () => {

    let stub;

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with add and commit', () => {
        shellModule.gitCommit();
        return stub.should.have.been.calledWith('git add -A && git commit -m "Initial Commit"', { silent: true });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitCommit().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitCommit().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitPush', () => {

    let stub;

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with git push', () => {
        shellModule.gitPush();
        return stub.should.have.been.calledWith('git push -u origin master', { silent: true });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitPush().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitPush().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });


});
