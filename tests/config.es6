export let readme = {
  src: '../src/generators/readme',
  deps: [],
  prompts: {
    title: 'Repository Title',
    description: 'Repository Description',
    usebadges: true,
    badges: [
      'npm',
      'travis',
      'coveralls',
      'gitter',
      'david',
      'davidDev'
    ],
    profile: 'test-profile',
    repository: 'test-repository'
  },
  options: {
    title: 'Repository Title',
    description: 'Repository Description',
    usebadges: true,
    badges: 'npm,travis,coveralls,gitter,david,davidDev',
    profile: 'test-profile',
    repository: 'test-repository'
  },
  save: {
    'generator-github-create': {
      'readme': {
        'title': 'Repository Title',
        'description': 'Repository Description',
        'badges': [
          'npm',
          'travis',
          'coveralls',
          'gitter',
          'david',
          'davidDev'
        ],
        'profile': 'test-profile',
        'repository': 'test-repository'
      }
    }
  }
};

export let orgs = {
  src: '../src/generators/orgs',
  deps: [
    [helpers.createDummyGenerator(), 'github-create:authenticate']
  ],
  prompts: {
    'skip-prompt': false,
    use: true,
    org: 'test-org'
  },
  options: {
    'skip-prompt': false,
    org: 'test-org'
  },
  save: {
    'generator-github-create': {
      'orgs': {
        'org': 'test-org'
      }
    }
  }
};

export let authenticate = {
  src: '../src/generators/authenticate',
  prompts: {
    username: 'testuser',
    saveuser: true,
    password: 'testpassword',
    twofactor: true,
    twofactorcode: 'asdf'
  },
  options: {
    debug: false
  },
  save: {
    'generator-github-create': {
      'authenticate': {
        'github': {
          'debug': false,
          'host': 'api.github.com',
          'protocol': 'https',
          'pathPrefix': '',
          'headers': {
            'user-agent': 'generator-github-create'
          },
          'scopes': 'user,public_repo,repo,repo:status'
        },
        'username': 'testuser',
        'appName': 'generator-github-create',
        'appUrl': 'https://github.com/trainerbill/generator-github-create',
        'twofactor': true
      }
    }
  }
};
