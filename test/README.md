### Overview

Jest configuration and tests for components in the `src` directory.  Tests are split into two suites - one for the 
Node.js server and one for the React client.  These test suites are run separately.  The client test suite runs in 
a `jsdom` environment and the server test suite runs in a `node` environment.

### Files

| Filename                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `client`                 | React.js client unit/integration/snapshot tests.                           |
| `server`                 | Node.js server unit/integration tests.                                     |
| `setupTests.js`          | Enzyme configuration with Jest and React 16.                               |
