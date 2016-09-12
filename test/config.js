export let readme = {
  src: '../src/generators/readme',
  prompts: {
    title: 'Repository Title',
    description: 'Repository Description',
    usebadges: true,
    badges: [
      'npm',
      'travis',
      'coveralls',
      'gitter',
      'david'
    ],
    profile: 'test-profile',
    repository: 'test-repository',
    scoped: false
  },
  config: {
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
        ],
        'profile': 'test-profile',
        'repository': 'test-repository'
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
    twofactorcode: 'twofactorcode'
  },
  options: {
    debug: false,
    host: 'api.github.com',
    protocol: 'https',
    path: '',
    twofactor: false,
    scopes: 'user,public_repo,repo,repo:status',
    appName: 'generator-github-create',
    appUrl: 'https://github.com/trainerbill/generator-github-create'
  },
  config: {
    'generator-github-create': {
      'authenticate': {
        'username': 'testuser',
        'twofactor': true
      }
    }
  }
};

export let create = {
  src: '../src/generators/create',
  prompts:{
    useOrg: false,
    name: 'testrepository',
    description: 'Test Description',
    private: false,
    init: true,
    push: true
  },
  options: {
    debug: false,
    username: 'testuser',
    name: 'testrepository',
    description: 'Test Description',
    private: false,
    init: true,
    push: true
  },
  config: {
    'generator-github-create': {
      'create': {
        'name': 'testrepository',
        'description': 'Test Description',
        'private': false,
        'init': true,
        'push': true,
        'urls': [
          'https://test',
          'git@test'
        ]
      }
    }
  }
};

export let pack = {
  src: '../src/generators/package',
  deps: [
    [helpers.createDummyGenerator(), 'license:app'],
  ],
  prompts: {
    scoped: false,
    name: 'test-package',
    description: 'Test Package',
    version: '0.0.1',
    keywords: 'asdf, asdf',
    author: 'Testy Mctest',
    main: 'test/dir'
  },
  options: {
    license: false
  },
  config: {
    'generator-github-create': {
      'package': {
        'scoped': false,
        'name': 'test-package',
        'description': 'Test Package',
        'version': '0.0.1',
        'keywords': [
          'asdf',
          'asdf'
        ],
        'author': 'Testy Mctest',
        'main': 'test/dir'
      }
    }
  }
};



export let app = {
  src: '../src/generators/app',
  deps: [
    [helpers.createDummyGenerator(), 'github-create:authenticate'],
    [helpers.createDummyGenerator(), 'github-create:create'],
    [helpers.createDummyGenerator(), 'github-create:readme'],
    [helpers.createDummyGenerator(), 'github-create:package']
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
