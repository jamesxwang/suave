# create image based on node from dockerhub
FROM node:lts-alpine as node

# create a dir where app will run
RUN mkdir -p /usr/src/vue-app

# set the working dir
WORKDIR /usr/src/vue-app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /usr/src/vue-app/

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . /usr/src/vue-app

# build app for production with minification
RUN npm run build -- --prod

VOLUME /root/data/frontend/dist /usr/src/vue-app/dist