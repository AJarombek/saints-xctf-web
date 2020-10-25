# Application server Dockerfile for the SaintsXCTF web application in the development environment.
# Author: Andrew Jarombek
# Date: 10/24/2020

FROM 739088120071.dkr.ecr.us-east-1.amazonaws.com/saints-xctf-web-base:latest AS base

WORKDIR src
RUN yarn build

FROM nginx AS host

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for running the SaintsXCTF web application in the development environment."

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.dev.conf /etc/nginx/conf.d

COPY --from=base /src/dist /usr/share/nginx/html
