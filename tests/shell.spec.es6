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
        shellModule.gitInit();
        return stub.should.have.been.calledWith('git init', { silent: true });
      });

      it('should resolve promise', () => {
        return shellModule.gitInit().should.be.fulfilled;
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitInit().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitInit().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitRemote', () => {

    let stub,
      config = {
        name: 'testy',
        url: 'testurl'
      };

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec git remote add', () => {
        shellModule.gitRemote(config);
        return stub.should.have.been.calledWith('git remote add ' + config.name + ' ' + config.url, { silent: true });
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

  describe('shell.gitRemotes', () => {

    let stub,
      output;

    describe('success', () => {

      beforeEach(() => {
        output = 'this\nis\na\ntest';
        stub = sandbox.stub(shell, 'exec').yields(0, output);
      });

      it('should call shell.exec git remote -v', () => {
        shellModule.gitRemotes();
        return stub.should.have.been.calledWith('git remote -v', { silent: true });
      });

      it('should return an array after splitting string', () => {
        return shellModule.gitRemotes()
          .then(res => {

            return res.length.should.equal(4);
          })
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitRemotes().should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitRemotes().should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.checkRemote', () => {

    let stub;

    beforeEach(() => {
      stub = sandbox.stub(shell, 'exec').yields(0, 'origin\t\n');
    });

    it('it should resolve true if name is not found in array', () => {
      return shellModule.checkRemote('testy').should.eventually.equal(true);
    });

    it('it should resolve error if name is found in array', () => {
      return shellModule.checkRemote('origin').should.eventually.equal('Remote name already exists');
    });

  });

  describe('shell.gitPull', () => {

    let stub;

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec git pull testy master', () => {
        shellModule.gitPull({ name: 'testy' });
        return stub.should.have.been.calledWith('git pull testy master', { silent: true });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitPull({ name: 'testy' }).should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitPull({ name: 'testy' }).should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitCommit', () => {

    let stub,
      config = {
        message: 'Test Message'
      };

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with add and commit', () => {
        shellModule.gitCommit(config);
        return stub.should.have.been.calledWith('git add -A && git commit -m "'+ config.message +'"', { silent: true });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitCommit(config).should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitCommit(config).should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });

  describe('shell.gitPush', () => {

    let stub,
      config = {
        name: 'testy',
        branch: 'testbranch'
      };

    describe('success', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(0, 'done');
      });

      it('should call shell.exec with git push', () => {
        shellModule.gitPush(config);
        return stub.should.have.been.calledWith('git push '+ config.name +' ' + config.branch, { silent: true });
      });

    });

    describe('error', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'exec').yields(1, 'testout', 'We have an error');
      });

      it('should reject promise with error', () => {
        return shellModule.gitPush(config).should.be.rejectedWith('We have an error');
      });

    });

    describe('no git', () => {

      beforeEach(() => {
        stub = sandbox.stub(shell, 'which').returns(false);
      });

      it('should reject promise with error', () => {
        return shellModule.gitPush(config).should.be.rejectedWith('This script requires local git installed!');
      });

    });

  });


});
