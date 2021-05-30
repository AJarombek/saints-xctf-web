# Application server Dockerfile for the SaintsXCTF web application meant for local use.
# Author: Andrew Jarombek
# Date: 7/22/2020

FROM node:14.4.0 AS base

COPY . src

WORKDIR src

ENV NODE_ENV=local
RUN yarn && yarn build

FROM nginx AS host

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for running the SaintsXCTF web application locally."

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.local.conf /etc/nginx/conf.d

COPY --from=base /src/dist /usr/share/nginx/html
