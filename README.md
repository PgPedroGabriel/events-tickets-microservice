# Events Microservice

## Features

* List of events and tickets
* Search events by name
* Read an event
* Filter event and tickets for another prouposes
* Remove ticket available count with RabbitMQ Consumer
* (Sentry to trace error logs)[https://sentry.io/]
* Morgan to trace requests

### Checks

- [ ] make sure that .env file is created
- [ ] make sure if you will use docker

### Using docker

1. To build:

``` docker-compose up --build -d ```

2. Install RabbitMQ container and make sure that container is in order-network, sample:

2.1 - install RabbitMQ container

``` docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management ```

2.2 - Add rabbitmq container events network

``` docker network ls ```

``` docker network connect events-tickets-microservice_events-microservice-network some-rabbit ```


### Using your local machine

1. download yarn
2. yarn install
3. yarn dev

To build to production

``` yarn run build ```

the dist folder will be generated


To test

``` yarn test ```


To migrations of database run:

``` yarn sequelize db:migrate ```

``` yarn sequelize db:seed:all ```

### Deploy using a docker image

Build your own docker image, remember to change .env vars

``` docker build -f .\Dockerfile.prod -t events-microservice-prod . ```

### Trick to vscode devolopment

Install plugins

1. ESLINT
2. Prettier
3. REST Client
4. Editorconfig
5. Docker
6. REST Client (to run requests inside vscode on requests file in root folder)

### Development pending tasks

- [ ] Code coverge > 80%
- [x] Add Logging traces
- [x] Add ALARM when errors occur
- [ ] Revison of production dockerfile builder
- [ ] Create CI/CD pipelines with docker-compose to GCP Cloud Builder
- [ ] Send pod to Kubernets Cluster
