export function orgs(orgs) {
  let choices = orgs.map(function(item) { return { name: item['login'], value: orgs.indexOf(item) }; });
  return [
    {
      when: (answers) => { return orgs.length },
      type    : 'confirm',
      name    : 'isOrg',
      message : 'Will this repository be part of an organization you belong to?',
      store   : true
    },
    {
      when: (answers) => { return answers.isOrg; },
      type: 'list',
      name: 'org',
      message: 'Select your organization',
      choices: choices,
      store   : true
    }
  ];
}
