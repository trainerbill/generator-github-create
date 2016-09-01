import path from 'path';
import * as github from '../src/generators/shared/github';
import { orgs } from './config';

let sandbox;

describe('generator-github-create:orgs', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('Default', () => {
    let orgsStub;
    beforeEach(() => {
      orgsStub = sandbox.stub(github, 'getOrgs').resolves([{ login: orgs.prompts.org }]);
      return helpers.run(path.join(__dirname, orgs.src))
        .withGenerators(orgs.deps)
        .withPrompts(orgs.prompts)
        .toPromise();
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', orgs.save);
    });

  });

  describe('Skip Prompt', () => {

    beforeEach(() => {
      orgs.options['skip-prompt'] = true;
      return helpers.run(path.join(__dirname, orgs.src))
        .withGenerators(orgs.deps)
        .withOptions(orgs.options)
        .toPromise();
    });

    afterEach(() => {
      orgs.options['skip-prompt'] = false;
    });

    it('should generate a config file', () => {
      return assert.jsonFileContent('.yo-rc.json', orgs.save);
    });

  });


});
