/**
 * Custom Cypress commands used on the log creation page.
 * @author Andrew Jarombek
 * @since 4/1/2021
 */

import ImageInputStatusClass = Cypress.ImageInputStatusClass;

Cypress.Commands.add(
  'newLogInputValidationCheck',
  (
    nameStatus: ImageInputStatusClass,
    locationStatus: ImageInputStatusClass,
    dateStatus: ImageInputStatusClass,
    distanceStatus: ImageInputStatusClass,
    timeStatus: ImageInputStatusClass
  ) => {
    cy.imageInputValidationCheck('name', nameStatus);
    cy.imageInputValidationCheck('location', locationStatus);
    cy.imageInputValidationCheck('date', dateStatus);
    cy.imageInputValidationCheck('distance', distanceStatus);
    cy.imageInputValidationCheck('time', timeStatus);
  }
);
