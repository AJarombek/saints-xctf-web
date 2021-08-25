# saints-xctf-web

![Maintained Label](https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge)

### Overview

Front-end for the SaintsXCTF web application.  This is the second version of the SaintsXCTF web application.  The 
front-end is written in React.js and styled with Sass.  API calls are routed through a Nginx proxy to the 
[SaintsXCTF API](https://github.com/AJarombek/saints-xctf-api).

### Commands

#### Start the Application Locally

**First time setup**

> Git, Node.js, npm, nvm, & yarn should be installed beforehand.

```bash
git clone https://github.com/AJarombek/saints-xctf-web.git 
cd saints-xctf-web
nvm install v12.18.4
nvm use v12.18.4
yarn
```

**Starting the server**

```bash
nvm use v12.18.4
yarn start
```

**Running snapshot, unit, and integration tests**

```bash
yarn test

# Update snapshots
yarn test:snapshot:update
```

**Running end to end Cypress tests**

```bash
export CYPRESS_SXCTF_PASSWORD=xxxx

# Run the Cypress tests in Chrome
yarn cy:open

# Run the Cypress tests in a headless browser
yarn cy:headless
```

**Build Docker Images Locally**

There are Jenkins jobs for building the SaintsXCTF Web Docker images and pushing them to Amazon ECR.  However, if you 
want to build them locally, run these commands:

```bash
docker image build -f app.dev.dockerfile -t saints-xctf-web-nginx-dev:latest .
docker image build -f app.dockerfile -t saints-xctf-web-nginx:latest .
```

**Starting the server using Docker Compose**

Starting the server locally with Docker Compose is useful for simulating the production Kubernetes environment locally.
Before running the web apps Docker Compose file, the API and Auth Docker Compose files should be run.

```bash
# First start the API server.
cd ~/repos/saints-xctf-api/infra/docker-compose
docker-compose -f docker-compose-api.yml --env-file .env.dev up --build

# Second start the Auth server.
cd ~/repos/saints-xctf-auth
docker-compose -f docker-compose.yml up --build

# Third and finally, start the web application.
cd ~/repos/saints-xctf-web

# If building the dev or production docker images, sign in to ECR.
eval $(aws ecr get-login --no-include-email | sed 's|https://||')

docker-compose up --build
```

### Integrations

[![Jenkins](https://img.shields.io/badge/Jenkins-%20saints--xctf--web--test-blue?style=for-the-badge)](https://jenkins.jarombek.io/job/saints-xctf/job/web/job/saints-xctf-web-test/)
> Jenkins job runs daily, running Jest unit/snapshot tests.

### Files

| Filename                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `assets`                 | Assets (images, videos, etc) bundled with the application source code.     |
| `cypress`                | Cypress end to end test source code.                                       |
| `src`                    | Application source code for both client and server.                        |
| `test`                   | Jest/Enzyme test code for both client and server.                          |
| `.babelrc`               | Configuration for the Babel transpiler.                                    |
| `.dockerignore`          | Directories and files for Docker to ignore when building an image.         |
| `.env`                   | Environment variables for the application.                                 |
| `.eslintrc.js`           | Configuration for ESLint JavaScript linting (AirBnb style guide).          |
| `app.dev.dockerfile`     | Docker image for the application in development.                           |
| `app.dockerfile`         | Docker image for the application in production.                            |
| `app.local.dockerfile`   | Docker image for the application locally.                                  |
| `base.dockerfile`        | Base image with the application source code used in production & for tests.|
| `cypress.json`           | Cypress end to end test configuration file.                                |
| `docker-compose.yml`     | Docker compose configuration for running the Dockerized app locally.       |
| `jest.config.js`         | Jest testing configuration for the application code.                       |
| `nginx.conf`             | Nginx web server configuration in the production environment.              |
| `nginx.dev.conf`         | Nginx web server configuration in the development environment.             |
| `nginx.local.conf`       | Nginx web server configuration for running locally.                        |
| `package.json`           | Entry point for the npm application.  Contains dependency definitions.     |
| `setup.sh`               | Bash commands for setting up the application.                              |
| `tsconfig.json`          | TypeScript configuration for the application.                              |
| `webpack.config.js`      | Main webpack configuration file.                                           |
| `webpack.parts.js`       | Smaller webpack parts to combine with the main configuration.              |
| `yarn.lock`              | Where Yarn stores the versions of each dependency.                         | 

### Version History

**[v2.0.8](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.8) - New Approach for Uploading Profile & Group Pictures**

> Release Date: August 24th, 2021

Change the underlying API calls used for uploading profile and group pictures.  The tag 
[v2.0.7](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.7) contains the same code changes, minus a bug fix for 
the group page not showing the proper group picture.

**[v2.0.6](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.6) - Website Titles and Icon**

> Release Date: August 13th, 2021

Improve the web browser experience by adding a website icon and giving unique titles to different web pages.

**[v2.0.5](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.5) - Easier to Create Logs**

> Release Date: August 12th, 2021

Made it easier for users to create logs in bulk.  After log creation, users are no longer redirected to the dashboard.  
Instead, they are alerted that the log creation was successful and can immediately enter a new log.  There are also a 
few other small improvements:

* When navigating to new pages, the browser window always scrolls up to the top of the page.
* Mobile styling improvements.
* Mobile Safari specific style fixes.

**[v2.0.4](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.4) - Log Notifications & Bug Fixes**

> Release Date: June 12th, 2021

A minor release for miscellaneous bug fixes.

* Fix "No Groups" screen flicker while loading the dashboard page
* Re-add notification for commenting on a user's exercise log

**[v2.0.3](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.3) - JavaScript Bundle Optimizations**

> Release Date: June 5th, 2021

A minor release which shrinks the JavaScript bundle size, resulting in a faster loading website.

* Shrink JavaScript bundle using Webpack optimizations
* Fix profile pictures & team pictures not displaying in UI
* Change leaderboards to show weekly leaders by default (instead of all-time)

**[v2.0.1](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.1) - Mobile Dropdown & Membership Fixes**

> Release Date: May 31st, 2021

A minor release fixing certain issues in the application.

* Mobile dropdown text & spacing size dependent on screen height
* Fix issue where group memberships don't load on the dashboard

**[v2.0.0](https://github.com/AJarombek/saints-xctf-web/tree/v2.0.0) - SaintsXCTF V2 Release**

> Release Date: May 30th, 2021

This major release marks the second major version of the SaintsXCTF website.

* A Revamped UI written with React
* Web application hosted on EKS in a Kubernetes Deployment

Notable changes in the new React UI compared to the old PHP/JQuery UI include:

* Teams, Team Memberships, and Team Groups
* Welcome Email upon Signup
* More Group Admin Functionality
* Weekly Chart shows a six-week bar chart
* New Profile Picture and Group Picture functionality
* Pick Teams & Groups Edit Profile section

### Resources

1. [Proxy to API](https://www.freecodecamp.org/news/never-use-an-absolute-path-for-your-apis-again-9ee9199563be/)
2. [React on Nginx](https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7)
3. [React Dev Server Proxy](https://stackoverflow.com/a/46202705)
4. [ts-jest Babel Config](https://kulshekhar.github.io/ts-jest/user/config/babelConfig)
