import { createRepository } from '../github';
import * as shell from '../shell';

export function install(generator) {
  if (generator.config.confirm) {
    return createRepository(generator)
      .then(() => init(generator));
  }
}

export function init(generator) {
  return new Promise((reject, resolve) => {

    if (!generator.config.init.init) {
      return resolve();
    }
    shell.gitInit();
    if (!generator.config.init.remote) {
      return resolve();
    }
    shell.gitRemote((generator.config.init.type === 'ssh') ? generator.config.github.repository.ssh_url : generator.config.github.repository.svn_url);
    if (!generator.config.init.pull) {
      return resolve();
    }
    shell.gitPull();

    return resolve();
  });
}
