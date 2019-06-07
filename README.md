# docker_inspector_server
The server part of a web based tool to interact and monitor docker containers

## Basic Info

1) Server was developed with NodeJS 10.16.0. Server exposes a REST API that will be consumed from a web based client
2) Server will serve at http://localhost:3000
3) [This](https://github.com/apocas/dockerode) Docker SDK library was used
4) After starting the server everythin else will be done from client at [this](https://github.com/Temeteron/docker_inspector_client) repo

## Get started
```
npm i
npm start
```

