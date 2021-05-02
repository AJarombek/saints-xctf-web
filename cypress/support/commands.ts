// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./commands.d.ts" />

/**
 * Custom commands to use in Cypress tests.  https://on.cypress.io/custom-commands
 * @author Andrew Jarombek
 * @since 7/18/2020
 */

import axios from 'axios';
import * as moment from 'moment';
import ImageInputStatusClass = Cypress.ImageInputStatusClass;

Cypress.Commands.add('setUserInLocalStorage', () => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1596919187,
      activation_code: 'abc123',
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
  const existingToken = Cypress.env('authToken');
  const existingTokenExpiration = Cypress.env('authTokenExpiration');

  if (existingToken && moment(existingTokenExpiration) > moment()) {
    localStorage.setItem('token', existingToken);
    return;
  }

  const instance = axios.create({
    baseURL: Cypress.env('authUrl'),
    timeout: 5000
  });

  instance
    .post('/token', {
      clientId: 'andy',
      clientSecret: Cypress.env('SXCTF_PASSWORD')
    })
    .then((res) => {
      const token = res.data.result;
      Cypress.env('authToken', token);

      const tokenExpiration = moment().add('45', 'minutes').format();
      Cypress.env('authTokenExpiration', tokenExpiration);

      localStorage.setItem('token', token);
    });
});

Cypress.Commands.add('setMockTokenInLocalStorage', () => {
  localStorage.setItem('token', 'j.w.t');
});

Cypress.Commands.add('imageInputValidationCheck', (inputName: string, status: ImageInputStatusClass) => {
  cy.getDataCy(`image-input-${inputName}`)
    .find('.status.none')
    .should(status === 'none' ? 'exist' : 'not.exist');
  cy.getDataCy(`image-input-${inputName}`)
    .find('.status.warning')
    .should(status === 'warning' ? 'exist' : 'not.exist');
  cy.getDataCy(`image-input-${inputName}`)
    .find('.status.failure')
    .should(status === 'failure' ? 'exist' : 'not.exist');
  cy.getDataCy(`image-input-${inputName}`)
    .find('.status.success')
    .should(status === 'success' ? 'exist' : 'not.exist');
});

Cypress.Commands.add('getDataCy', (value) => {
  return cy.get(`[data-cypress=${value}]`);
});

Cypress.Commands.add('getDataCyContains', (value, contains) => {
  return cy.get(`[data-cypress=${value}]:contains("${contains}")`);
});

Cypress.Commands.add('findDataCy', { prevSubject: true }, (subject, value) => {
  return cy.wrap(subject).find(`[data-cypress=${value}]`);
});

Cypress.Commands.add('getImageInput', (value) => {
  return cy.get(`.sxctf-image-input input[name="${value}"]`);
});
