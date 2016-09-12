import path from 'path';
import { pack } from './config';

describe('generator-github-create:package', () => {

  describe('Default', () => {

    beforeEach(() => {
      return helpers.run(path.join(__dirname, pack.src))
        .withGenerators(pack.deps)
        .withPrompts(pack.prompts)
        .withOptions(pack.options)
        .toPromise();
    });

    it('should generate package.json file', () => {
      return assert.file('package.json');
    });

    it('should generate package.json with configuration', () => {
      return assert.jsonFileContent('package.json', {
        name: 'test-package',
        description: 'Test Package',
        version: '0.0.1',
        keywords: ['asdf', 'asdf'],
        author: 'Testy Mctest',
        main: 'test/dir'
      });
    });

  });

});
