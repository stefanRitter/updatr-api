# Updatr API

built with Hapi.js

## Setup dev environment

    npm install supervisor grunt bower -g
    npm install
    bower install
    grunt build

## Start script

    ./start

## Start dev server

    supervisor server/

## SSL
certbot certonly --config-dir ~/updatr/ --work-dir ~/updatr/ --logs-dir ~/updatr/ --manual
https://medium.com/@franxyzxyz/setting-up-free-https-with-heroku-ssl-and-lets-encrypt-80cf6eac108e#.sialj925h
