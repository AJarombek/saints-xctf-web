#!/usr/bin/env bash

# Bash commands used to set up the web React.js/Node.js application.
# Author: Andrew Jarombek
# Date: 12/25/2019

npm init
yarn

# Dependencies
yarn add react
yarn add express
yarn add prop-types
yarn add react-dom
yarn add react-router-dom
yarn add body-parser
yarn add helmet

# Dev Dependencies
yarn add @babel/core --dev
yarn add webpack --dev
yarn add webpack-cli --dev
yarn add sass-loader --dev
yarn add css-loader --dev
yarn add babel-loader --dev
yarn add mini-css-extract-plugin --dev
yarn add webpack-merge --dev
yarn add html-loader --dev
yarn add ignore-loader --dev
