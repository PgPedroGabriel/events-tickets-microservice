# Events Microservice

## Features

* List of events and tickets
* Search events by name
* Read an event
* Filter event and tickets for another prouposes
* Remove ticket available count with RabitMQ

### Checks

- [ ] make sure that .env file is created
- [ ] make sure if you will use docker

### Using docker

1. To test:

``` docker-compose -p tests run -p 3001 events-microservice yarn test ```

2. To build:

``` docker-compose up --build -d ```

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
