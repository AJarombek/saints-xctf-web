// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./commands.d.ts" />

/**
 * Custom commands to use in Cypress tests.  https://on.cypress.io/custom-commands
 * @author Andrew Jarombek
 * @since 7/18/2020
 */

import 'cypress-file-upload';

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
    cy.log('Using existing token');
    cy.log(`Existing token expires ${existingTokenExpiration}`);
    localStorage.setItem('token', existingToken);
    return;
  }

  cy.log('Retrieving new auth token');

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
    })
    .catch((error) => {
      console.info(error);
    });
});

Cypress.Commands.add('setMockTokenInLocalStorage', () => {
  const header = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9';
  const payload =
    'ewogICJpYXQiOiAxNjI0MTQ2MTY4LAogICJleHAiOiA5OTk5OTk5OTk5OSwKICAiaXNzIjogImF1dGguc2FpbnRzeGN0' +
    'Zi5jb20iLAogICJzdWIiOiAiYW5keSIsCiAgImVtYWlsIjogImFuZHJld0BqYXJvbWJlay5jb20iLAogICJuYW1lIjogIkFuZHkgSmFy' +
    'b21iZWsiCn0';
  const signature =
    'm7J4x0mulzuZLwdB6cDqN_wuHp5aHI0uIUK44fPeaFYbtcVqqCv4eI20RMRP9KfNuPmtgc4Yu-ZGO8GX_UTLK6K9jD' +
    'uZRKrozUb-_02pvk93SVOKxKulm126RcZePiZ6xa5NyhCenS7ye6oq9Mv28eklGhHNHJMqlg8IQ06NQW2kQyr1e9EUhdUtCz80nwMme0' +
    'ZI74kyMk7ICArSdZDqprcjTxGNnyFqyjIphi_R14sEn7mEE0Hx89q_71IOgGzGMljbpIG0NxaRjd2aKKSnDQVtCdOlaJ1Elgw6fPIhp7' +
    'z7ZbHrlI9k8B18950VaM4xMD9brA4N8pH4dRk4W8kA1fi8ZHek9emKGVCoUxbXpZvJ39yNHlxSsccGNCpNUb30ioZCNxMChPz_pLUrs2' +
    'DVmd2NTrxrJhBFD46cW6yGNUjeBExJEE0ujSwp7dsFxoLXQyqtBiWTlX7Gp8X8kuV_3JKMgZPpvPdHAS3-DXDZGE_dEN9Olf1wOZkOYJ' +
    'L32OFrGEvPbgxUJBEjGAJ-K4FD6v8z1ui-Tx3LaPaN2RRvGt3ZOzmvZFoa1ySKvIbDSWZzOmLK_btY-rCWLL6hLNvlQUn8FE3LxtWrhl' +
    'VKko_RE8jgIHVG2ylLH3rPBdUpNRiNq5-wOiAJlCiNitT-dZzUcko37KObqGHiBjgvWEdzfBc';

  localStorage.setItem('token', `${header}.${payload}.${signature}`);
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
