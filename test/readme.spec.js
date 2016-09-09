import path from 'path';
import { readme } from './config';

describe('generator-github-create:readme', () => {

  describe('Default', () => {

    beforeEach(() => {
      return helpers.run(path.join(__dirname, readme.src))
        .withPrompts(readme.prompts)
        .toPromise();
    });

    it('should generate a README.md file', () => {
      return assert.file('README.md');
    });

    it('should save config file', () => {
      return assert.jsonFileContent('.yo-rc.json', readme.save);
    });

  });

});
