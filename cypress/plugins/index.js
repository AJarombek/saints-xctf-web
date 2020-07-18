// https://on.cypress.io/plugins-guide

const cypressCodeCoverageTask = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  cypressCodeCoverageTask(on, config);

  return config;
};
