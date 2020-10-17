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

### Files

| Filename                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `src`                    | Application source code for both client and server.                        |
| `test`                   | Jest/Enzyme test code for both client and server.                          |
| `.babelrc`               | Configuration for the Babel transpiler.                                    |
| `.eslintrc.js`           | Configuration for ESLint JavaScript linting (AirBnb style guide).          |
| `Dockerfile`             | Blueprint for a Docker image which containerizes the application.          |
| `jest.client-config.js`  | Jest testing configuration for the client side code.                       |
| `jest.server-config.js`  | Jest testing configuration for the server side code.                       |
| `package.json`           | Entry point for the npm application.  Contains dependency definitions.     |
| `setup.sh`               | Bash commands for setting up the application.                              |
| `webpack.config.js`      | Main webpack configuration file.                                           |
| `webpack.parts.js`       | Smaller webpack parts to combine with the main configuration.              |
| `.yarn.lock`             | Where Yarn stores the versions of each dependency.                         | 

### Version History

**V.2.0.0 - SaintsXCTF V2 Release**

> Release Date: TBD

### Resources

1. [Proxy to API](https://www.freecodecamp.org/news/never-use-an-absolute-path-for-your-apis-again-9ee9199563be/)
2. [React on Nginx](https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7)
3. [React Dev Server Proxy](https://stackoverflow.com/a/46202705)
4. [ts-jest Babel Config](https://kulshekhar.github.io/ts-jest/user/config/babelConfig)
