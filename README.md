# saints-xctf-web

### Overview

Front-end for the SaintsXCTF web application.  This is the second version of the SaintsXCTF web application.  The 
front-end is written in React.js and styled with Sass.  API calls are routed through a Nginx proxy to the 
[SaintsXCTF API](https://github.com/AJarombek/saints-xctf-api).

### Start the Application Locally

**First time setup**

> Git, Node.js, npm, nvm, & yarn should be installed beforehand.

```bash
git clone https://github.com/AJarombek/saints-xctf-web.git 
cd saints-xctf-web
nvm install v10.15.3
nvm use v10.15.3
yarn
```

**Starting the server**

```bash
nvm use v10.15.3
yarn start
```

**Running snapshot, unit, and integration tests**

```bash
yarn test

# Update snapshots
yarn test-update
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
docker-compose up --build
```

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
| `app.dockerfile`         | Docker image for the application in production.                            |
| `app.local.dockerfile`   | Docker image for the application locally.                                  |
| `base.dockerfile`        | Base image with the application source code used in production & for tests.|
| `cypress.json`           | Cypress end to end test configuration file.                                |
| `docker-compose.yml`     | Docker compose configuration for running the Dockerized app locally.       |
| `jest.config.js`         | Jest testing configuration for the application code.                       |
| `nginx.conf`             | Nginx web server configuration.                                            |
| `package.json`           | Entry point for the npm application.  Contains dependency definitions.     |
| `setup.sh`               | Bash commands for setting up the application.                              |
| `tsconfig.json`          | TypeScript configuration for the application.                              |
| `webpack.config.js`      | Main webpack configuration file.                                           |
| `webpack.parts.js`       | Smaller webpack parts to combine with the main configuration.              |
| `yarn.lock`              | Where Yarn stores the versions of each dependency.                         | 

### Version History

**V.2.0.0 - SaintsXCTF V2 Release**

> Release Date: TBD

### Resources

1. [Proxy to API](https://www.freecodecamp.org/news/never-use-an-absolute-path-for-your-apis-again-9ee9199563be/)
2. [React on Nginx](https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7)
3. [React Dev Server Proxy](https://stackoverflow.com/a/46202705)
4. [ts-jest Babel Config](https://kulshekhar.github.io/ts-jest/user/config/babelConfig)
