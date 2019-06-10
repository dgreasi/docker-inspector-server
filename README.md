# docker_inspector_server
The server part of a web based tool to interact and monitor docker containers

## Basic Info

- Server was developed with NodeJS 10.16.0. Server exposes a REST API that will be consumed from a web based client
- Server will serve at http://localhost:3000
- [This](https://github.com/apocas/dockerode) Docker SDK library was used
- After starting the server everything else will be done from client at [this](https://github.com/Temeteron/docker_inspector_client) repo
- All minimal requirements were materialized
- No optional requirement were materialized, due to lack of time

## Improvements that could be done
- Add typescript
- Create tests for API

## Get started
```
npm i
npm start
```

