#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password \
    MONGO_URI=mongodb://admin:password@mongodb:27017/JOBIFY-NIZAR-FROM-ZERO?authSource=admin \
    JWT_SECRET=nZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B \
    JWT_LIFETIME=1d \
    NODE_ENV=PRODUCTION
#Creating a new directory for app files and setting path in the container
# RUN mkdir -p /usr/src/app
RUN mkdir -p /home/app
#setting working directory in the container
# WORKDIR /usr/src/app
WORKDIR /home/app
#copying the package.json file(contains dependencies) from project source dir to container dir
# COPY package.json /usr/src/app
COPY package.json /home/app
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
# COPY . /usr/src/app
COPY . /home/app
#container exposed network port number
EXPOSE 5000
#command to run within the container
CMD ["node", "server.js"]