### Overview

E2E (End to end) test source code.  Each file contains tests for a specific page in the application.

There are three types of tests.  The first type are standard E2E tests that connect to the API.  The second type are 
E2E with mocked API calls.  The third type are E2E tests run on a mobile screen.

### Files

**Standard E2E Tests**

| Filename                  | Description                                                                               |
|---------------------------|-------------------------------------------------------------------------------------------|
| `Dashboard.e2e.test.js`   | E2E tests for the dashboard page (`/dashboard`).                                          |
| `Dashboard.e2e.test.js`   | E2E tests with mocked API calls for the dashboard page (`/dashboard`).                    |
| `Home.e2e.test.js`        | E2E tests for the signed out home page (`/`).                                             |
| `Profile.e2e.test.js`     | E2E tests for a user's profile page (`/profile/<username>`).                              |
| `Register.e2e.test.js`    | E2E tests for the register page (`/register`).                                            |
| `SignIn.e2e.test.js`      | E2E tests for the dashboard page (`/signin`).                                             |

**Mocked API E2E Tests**

| Filename                  | Description                                                                               |
|---------------------------|-------------------------------------------------------------------------------------------|

**Mobile E2E Tests**

| Filename                  | Description                                                                               |
|---------------------------|-------------------------------------------------------------------------------------------|
