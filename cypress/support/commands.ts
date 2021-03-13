/**
 * Custom commands to use in Cypress tests.  https://on.cypress.io/custom-commands
 * @author Andrew Jarombek
 * @since 7/18/2020
 */

Cypress.Commands.add('setUserInLocalStorage', () => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1596919187,
      activation_code: 'BbXuat',
      class_year: 2017,
      deleted: null,
      description: 'I sometimes like to run.',
      email: 'andrew@jarombek.com',
      favorite_event: 'Shakeout',
      first: 'Andy',
      last: 'Jarombek',
      last_signin: '2020-08-13 12:53:18',
      location: 'Riverside, CT',
      member_since: '2016-12-23',
      password: null,
      salt: null,
      subscribed: null,
      username: 'andy',
      week_start: 'monday'
    })
  );
});

Cypress.Commands.add('setTokenInLocalStorage', () => {
  localStorage.setItem('token', 'j.w.t');
});

Cypress.Commands.add('getDataCy', (value) => {
  return cy.get(`[data-cypress=${value}]`);
});

Cypress.Commands.add('findDataCy', { prevSubject: true }, (subject, value) => {
  return cy.wrap(subject).find(`[data-cypress=${value}]`);
});
