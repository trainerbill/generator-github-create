import path from 'path';
import * as github from '../src/generators/shared/github';
import { app } from './config';

let sandbox;

describe('generator-github-create:app', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should run without failure', () => {
    return helpers.run(path.join(__dirname, app.src))
      .withGenerators(app.deps)
      .toPromise();
  });

});
