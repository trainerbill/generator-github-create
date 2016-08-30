import find from 'lodash.find';

export function repository(repos) {
  return [
    {
      name: 'name',
      message: 'Repository Name',
      validate: (input) => { return ((find(repos, { name: input })) ? input + ' repository exists.' : true); }
    },
    {
      name: 'description',
      message: 'Repository Description'
    },
    {
      type: 'list',
      name: 'private',
      message: 'Access',
      choices: [
        {
          name: 'Public',
          value: false
        },
        {
          name: 'Private - You have to pay for this',
          value: true
        }
      ],
      store: true
    },
    {
      type: 'list',
      name: 'license',
      message: 'License',
      choices: [
        {
          name: 'ISC',
          value: 'isc'
        },
        {
          name: 'MIT',
          value: 'mit'
        },
        {
          name: 'Apache',
          value: 'apache'
        }
      ],
      store: true
    }
  ];
}
