# Base Dockerfile for the SaintsXCTF web application.
# Author: Andrew Jarombek
# Date: 7/22/2020

FROM node:14.4.0

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for setting up the SaintsXCTF web application"

COPY . src

WORKDIR src
RUN yarn
