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

export function gitInit() {
  if (shell.which('git')) {
    return shell.exec('git init', { silent: true });
  }
};

export function gitRemote(url) {
  if (shell.which('git')) {
    return shell.exec('git remote add origin ' + url, { silent: true });
  }
};

export function gitPull(url) {
  if (shell.which('git')) {
    return shell.exec('git pull -u origin master', { silent: true });
  }
};
