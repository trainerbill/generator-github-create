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

  describe('Skip Prompt', () => {

    beforeEach(() => {
      readme.options['skip-prompt'] = true;
      return helpers.run(path.join(__dirname, readme.src))
        .withOptions(readme.options)
        .withPrompts(readme.prompts)
        .toPromise();
    });

    afterEach(() => {
      readme.options['skip-prompt'] = false;
    });

    it('should generate a README.md file', () => {
      return assert.file('README.md');
    });

    it('should save config file', () => {
      return assert.jsonFileContent('.yo-rc.json', readme.save);
    });

  });


});
