import shell from 'shelljs';


export function getUsername() {
  return shell.exec('git config --get user.githubuser', { silent: true }).stdout.trim();
};

export function saveEmail(email) {
  if (shell.which('git')) {
    return shell.exec('git config --global user.email "' + email + '"', { silent: true });
  }
};

export function saveName(name) {
  if (shell.which('git')) {
    return shell.exec('git config --global user.name "' + name + '"', { silent: true });
  }
};

export function saveUsername(username) {
  if (shell.which('git')) {
    return shell.exec('git config --global user.githubuser "' + username + '"', { silent: true });
  }
};

export function gitInit(config) {
  if (!config.init) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git init', { silent: true }, (code, stdout, stderr) => {
        return resolve();
      });
    }
  });
};

export function gitRemote(config) {
  if (!config.remote) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git remote add ' + config.remote + ' ' + config.url, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};

export function gitRemotes() {
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git remote -v', { silent: true }, (code, stdout, stderr) => {
        let remotes = stdout.split('\n');

        resolve(remotes);
      });
    }
  });
};

export function checkRemote(name) {
  return new Promise((resolve, reject) => {
    gitRemotes()
      .then(remotes => {
        //console.log(remotes);
        let regex = new RegExp('^' + name + '\t');
        remotes.forEach(remote => {
          if(regex.test(remote)) {
            console.log('Exists!!!!');
            resolve('Remote name already exists');
          }
        });
        resolve(true)
      });
  });
}


export function gitPull(config) {
  if (!config.pull) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git pull origin master', (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};

export function gitCommit(config) {
  if (!config.commit) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git add -A && git commit -m ' + config.message, (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};


export function gitPush(config) {
  if (!config.pull) {
    return true;
  }
  return new Promise((resolve, reject) => {
    if (shell.which('git')) {
      shell.exec('git push origin master', (code, stdout, stderr) => {
        resolve();
      });
    }
  });
};
