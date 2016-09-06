import shell from 'shelljs';


export function getUsername() {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }

    shell.exec('git config --get user.githubuser', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(stdout.trim());
    });

  });

}

export function saveEmail(email) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git config --global user.email "' + email + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function saveName(name) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git config --global user.name "' + name + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function saveUsername(username) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git config --global user.githubuser "' + username + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function gitInit() {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git init', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function gitRemote(config) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git remote add ' + config.name + ' ' + config.url, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function gitRemotes() {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git remote -v', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      let remotes = stdout.split('\n');
      return resolve(remotes);
    });
  });
}

export function checkRemote(name) {
  return new Promise((resolve, reject) => {
    gitRemotes()
      .then(remotes => {

        let regex = new RegExp('^' + name + '\t');
        remotes.forEach(remote => {
          if(regex.test(remote)) {
            return resolve('Remote name already exists');
          }
        });
        return resolve(true);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        if (err === 'fatal: Not a git repository (or any of the parent directories): .git\n') {
          return resolve(true);
        }
        return resolve(err);
      });
  });
}

export function gitPull(config) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git pull ' + config.name + ' master', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

export function gitCommit(config) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git add -A && git commit -m "' + config.message + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}


export function gitPush(config) {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git push' + ((config.name === 'origin') ? ' -u ' : ' ') + config.name + ' ' + config.branch, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}
