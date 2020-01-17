#!/usr/bin/env bash

# Bash commands used to set up the web React.js/Node.js application.
# Author: Andrew Jarombek
# Date: 12/25/2019

npm init
yarn

nvm use v10.15.3
yarn --force

# Dependencies
yarn add react
yarn add express
yarn add prop-types
yarn add react-dom
yarn add react-router-dom
yarn add body-parser
yarn add helmet
yarn add classnames

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
yarn add html-webpack-plugin --dev
yarn add enzyme --dev
yarn add enzyme-adapter-react-16 --dev
yarn add babel-eslint --dev
yarn add eslint --dev
yarn add eslint-config-airbnb --dev
yarn add eslint-plugin-import --dev
yarn add eslint-plugin-jsx-a11y --dev
yarn add eslint-plugin-react --dev
yarn add node-sass --dev
yarn add @babel/preset-env --dev
yarn add @babel/preset-react --dev
yarn add react-hot-loader --dev
yarn add @hot-loader/react-dom --dev
yarn add url-loader --dev
yarn add file-loader --dev

# Start Locally
export NODE_ENV=local
yarn client:build:local
yarn server:build:local
yarn server:deploy
