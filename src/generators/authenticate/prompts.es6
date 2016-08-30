export function authentication(username) {
  return [
    {
      name    : 'username',
      message : 'Github Username',
      default: username,
      store   : true
    },
    {
      when: (answers) => { return answers.username !== username; },
      type: 'confirm',
      name: 'save',
      message: 'Save username to git config?  Will make generation faster next time',
      default: 'Y'
    },
    {
      type    : 'password',
      name    : 'password',
      message : 'Github Password'
    }
  ];
}

export function gitEmail(email) {
  return [
    {
      name: 'email',
      message: 'Git Email',
      default: email
    },
    {
      when: (answers) => { return answers.email !== email; },
      type: 'confirm',
      name: 'save',
      message: 'Save email to git config?  Will make generation faster next time',
      default: 'Y'
    }
  ];
}

export function gitName(name) {
  return [
    {
      name: 'name',
      message: 'Git Name',
      default: name
    },
    {
      when: (answers) => { return answers.name !== name; },
      type: 'confirm',
      name: 'save',
      message: 'Save name to git config?  Will make generation faster next time',
      default: 'Y'
    }
  ];
}
