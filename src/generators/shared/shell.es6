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

export function gitInit(config) {
  return new Promise((resolve, reject) => {
    if (!config.init) {
      return resolve(config);
    }
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git init', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(config);
    });
  });
}

export function gitRemote(config) {
  return new Promise((resolve, reject) => {
    if (!config.init) {
      return resolve(config);
    }
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git remote add origin ' + config.urls[1], { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(config);
    });
  });
}

export function gitCommit() {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git add -A && git commit -m "Initial Commit"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}


export function gitPush() {
  return new Promise((resolve, reject) => {
    if (!shell.which('git')) {
      return reject('This script requires local git installed!');
    }
    shell.exec('git push -u origin master', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}
