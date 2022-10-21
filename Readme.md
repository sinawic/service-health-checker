# nodejs upstream services health check app

populate the `upstreams.json` file

sample data should look something like:
> `[{ "host": "11.11.11.11", "port": 15440, "name": "some_name", "mode": "tcp" }]`

*only `mode: tcp` currently supported.*
### running with source

after you clone the repo 

first install the required packages by running:
> `npm i`

then run the health checker simply by running:
> `npm start`

### running using docker image

just clone the repo to get the `docker-compose` file

then run the health checker container simply by running:

> `docker-compose up -d`

which will try to build the image if you dont have it locally,

or run:

> `docker pull sinawic/service-health-checker`

to get the image from docker hub registry.

### build docker image yourself, in case you dont have access to docker hub registry

just clone the repo to get the source files

then by running:

> `docker build -t sinawic/service-health-checker .`

have fun :)