// https://on.cypress.io/custom-commands

/**
 * Mock the SaintsXCTF API calls made from the UI.
 */
Cypress.Commands.add('mockAPI', () => {
  cy.server();
});

Cypress.Commands.add('setUserInLocalStorage', () => {
  localStorage.setItem('user', JSON.stringify({
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
  }));
});
