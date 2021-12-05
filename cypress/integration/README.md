### Overview

E2E (End to end) test source code.  Each file contains tests for a specific page in the application.

There are three types of tests.  The first type are standard E2E tests that connect to the API.  The second type are 
E2E with mocked API calls.  The third type are E2E tests run on a mobile screen.

### Files

**Standard E2E Tests**

| Filename                          | Description                                                                               |
|-----------------------------------|-------------------------------------------------------------------------------------------|
| `Admin.e2e.test.js`               | E2E tests for the admin page (`/admin`).                                                  |
| `Dashboard.e2e.test.js`           | E2E tests for the dashboard page (`/dashboard`).                                          |
| `EditLog.e2e.test.js`             | E2E tests for the edit log page (`/log/edit/<log_id>`).                                   |
| `ForgotPassword.e2e.test.js`      | E2E tests for the forgot password page (`/forgotpassword`).                               |
| `ForgotPasswordReset.e2e.test.js` | E2E tests for the forgot password reset page (`/forgotpassword/reset`).                   |
| `Group.e2e.test.js`               | E2E tests for the group page (`/group/<group_id>`).                                       |
| `GroupAdmin.e2e.test.js`          | E2E tests for the group admin page (`/admin/group/<group_id>`).                           |
| `Home.e2e.test.js`                | E2E tests for the signed out home page (`/`).                                             |
| `Profile.e2e.test.js`             | E2E tests for a user's profile page (`/profile/<username>`).                              |
| `Register.e2e.test.js`            | E2E tests for the register page (`/register`).                                            |
| `SignIn.e2e.test.js`              | E2E tests for the dashboard page (`/signin`).                                             |
| `Teams.e2e.test.js`               | E2E tests for the teams page (`/teams`).                                                  |
| `ViewLog.e2e.test.js`             | E2E tests for the view log page (`/log/view/<log_id>`).                                   |

**Mocked API E2E Tests**

| Filename                               | Description                                                                                   |
|----------------------------------------|-----------------------------------------------------------------------------------------------|
| `Admin.mock.e2e.test.js`               | E2E tests with mocked API calls for the admin page (`/admin`).                                |
| `Dashboard.mock.e2e.test.js`           | E2E tests with mocked API calls for the dashboard page (`/dashboard`).                        |
| `EditLog.mock.e2e.test.js`             | E2E tests with mocked API calls for the edit log page (`/log/edit/<log_id>`).                 |
| `ForgotPassword.mock.e2e.test.js`      | E2E tests with mocked API calls for the forgot password page (`/forgotpassword`).             |
| `ForgotPasswordReset.mock.e2e.test.js` | E2E tests with mocked API calls for the forgot password reset page (`/forgotpassword/reset`). |
| `Group.mock.e2e.test.js`               | E2E tests with mocked API calls for the group page (`/group/<group_id>`).                     |
| `GroupAdmin.mock.e2e.test.js`          | E2E tests with mocked API calls for the group admin page (`/admin/group/<group_id>`).         |
| `NewLog.mock.e2e.test.js`              | E2E tests with mocked API calls for the new log page (`/log/new`).                            |
| `Profile.mock.e2e.test.js`             | E2E tests with mocked API calls for the profile page (`/profile/<username>`).                 |
| `Register.mock.e2e.test.js`            | E2E tests with mocked API calls for the register page (`/register`).                          |
| `SignIn.mock.e2e.test.js`              | E2E tests with mocked API calls for the sign in page (`/signin`).                             |
| `Teams.mock.e2e.test.js`               | E2E tests with mocked API calls for the teams page (`/teams`).                                |
| `ViewLog.mock.e2e.test.js`             | E2E tests with mocked API calls for the view log page (`/log/view/<log_id>`).                 |

**Mobile E2E Tests**

| Filename                                 | Description                                                                    |
|------------------------------------------|--------------------------------------------------------------------------------|
| `Admin.mobile.e2e.test.js`               | E2E tests for the mobile admin page (`/admin`).                                |
| `Dashboard.mobile.e2e.test.js`           | E2E tests for the mobile dashboard page (`/dashboard`).                        |
| `EditLog.mobile.e2e.test.js`             | E2E tests for the mobile edit log page (`/log/edit/<log_id>`).                 |
| `ForgotPassword.mobile.e2e.test.js`      | E2E tests for the mobile forgot password page (`/forgotpassword`).             |
| `ForgotPasswordReset.mobile.e2e.test.js` | E2E tests for the mobile forgot password reset page (`/forgotpassword/reset`). |
| `Group.mobile.e2e.test.js`               | E2E tests for the mobile group page (`/group/<group_id>`).                     |
| `GroupAdmin.mobile.e2e.test.js`          | E2E tests for the mobile group admin page (`/admin/group/<group_id>`).         |
| `Home.mobile.e2e.test.js`                | E2E tests for the mobile signed out home page (`/`).                           |
| `Profile.mobile.e2e.test.js`             | E2E tests for the mobile profile page (`/profile/<username>`).                 |
| `Register.mobile.e2e.test.js`            | E2E tests for the mobile register page (`/register`).                          |
| `SignIn.mobile.e2e.test.js`              | E2E tests for the mobile sign in page (`/signin`).                             |
| `Teams.mobile.e2e.test.js`               | E2E tests for the mobile teams page (`/teams`).                                |
| `ViewLog.mobile.e2e.test.js`             | E2E tests for the mobile view log page (`/log/view/<log_id>`).                 |
