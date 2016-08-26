import * as shell from '../shell';

export function initializing(generator) {
  return new Promise((resolve, reject) => {
    generator.config.git.email = generator.user.git.email();
    generator.config.git.name = generator.user.git.name();
    generator.config.github.username = shell.getUsername();

    return resolve(generator);
  });
}
