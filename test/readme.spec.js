import path from 'path';
import { readme } from './config';

describe('generator-github-create:readme', () => {

  describe('No Scope', () => {

    beforeEach(() => {
      return helpers.run(path.join(__dirname, readme.src))
        .withPrompts(readme.prompts)
        .toPromise();
    });

    it('should generate a README.md file', () => {
      return assert.file('README.md');
    });

    it('should have installation instructions for non scoped package', () => {
      return assert.fileContent('README.md', `npm install --save ${readme.prompts.repository}`);
    });

    it('should save config file', () => {
      return assert.jsonFileContent('.yo-rc.json', readme.config);
    });

  });

  describe('Scoped', () => {

    beforeEach(() => {
      let prompts = readme.prompts;
      prompts.scoped = true;
      return helpers.run(path.join(__dirname, readme.src))
        .withPrompts(prompts)
        .toPromise();
    });

    it('should have installation instructions for scoped package', () => {
      return assert.fileContent('README.md', `npm install --save @${readme.prompts.profile}/${readme.prompts.repository}`);
    });

  });

  describe('Enable badges', () => {

    beforeEach(() => {
      return helpers.run(path.join(__dirname, readme.src))
        .withPrompts(readme.prompts)
        .toPromise();
    });


    it('should have david badge', () => {
      return assert.fileContent('README.md', '[![dependencies Status][david-image]][david-url]');
    });

    it('should not have david dependencies badge', () => {
      return assert.noFileContent('README.md', '[![devDependencies Status][davidDev-image]][davidDev-url]');
    });

  });

});
