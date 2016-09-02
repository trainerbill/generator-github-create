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

    beforeEach(() => {
      stub = sandbox.stub(shell, 'exec').returns({ stdout: 'testout ' });
    });

    it('should call shell.exec', () => {
      shellModule.getUsername();
      return stub.should.have.been.calledWith('git config --get user.githubuser', { silent: true });
    });

    it('should trim and return a username', () => {
      let temp = shellModule.getUsername();
      return temp.should.equal('testout');
    });

  });

  describe('shell.saveEmail', () => {

    let stub,
      email;

    beforeEach(() => {
      email = 'test@awesome.com';
      stub = sandbox.stub(shell, 'exec');
    });

    it('should call shell.exec with passed email', () => {
      shellModule.saveEmail(email);
      return stub.should.have.been.calledWith('git config --global user.email "' + email + '"', { silent: true });
    });

  });

  describe('shell.saveName', () => {

    let stub,
      name;

    beforeEach(() => {
      name = 'Test Me';
      stub = sandbox.stub(shell, 'exec');
    });

    it('should call shell.exec with passed email', () => {
      shellModule.saveName(name);
      return stub.should.have.been.calledWith('git config --global user.name "' + name + '"', { silent: true });
    });

  });

  describe('shell.username', () => {

    let stub,
      username;

    beforeEach(() => {
      username = 'testy';
      stub = sandbox.stub(shell, 'exec');
    });

    it('should call shell.exec with passed email', () => {
      shellModule.saveUsername(username);
      return stub.should.have.been.calledWith('git config --global user.githubuser "' + username + '"', { silent: true });
    });

  });

  describe('shell.gitInit', () => {

    let stub;

    beforeEach(() => {
      stub = sandbox.stub(shell, 'exec');
    });

    it('should call shell.exec git init', () => {
      shellModule.gitInit();
      return stub.should.have.been.calledWith('git init', { silent: true });
    });

  });

  describe('shell.gitRemote', () => {

    let stub,
      config = {};

    beforeEach(() => {
      config.name = 'testy';
      config.url = 'testurl';
      stub = sandbox.stub(shell, 'exec');
    });

    it('should call shell.exec git remote add', () => {
      shellModule.gitRemote(config);
      return stub.should.have.been.calledWith('git remote add ' + config.name + ' ' + config.url, { silent: true });
    });

  });

  describe('shell.gitRemotes', () => {

    let stub,
      output;

    beforeEach(() => {
      output = 'this\nis\na\ntest';
      stub = sandbox.stub(shell, 'exec').yields(null, output);
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

});
