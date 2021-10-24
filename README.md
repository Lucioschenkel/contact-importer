# 1. Motivation

This repository contains the source code implementation of the "Contact Importer" challenge app.

## 1.1 Important note

This app requires a few environment variables to run properly. Those variables need to be defined in a ".env" file at the root level of this project. The one used for development was placed intentionally marked for ignoring by git in the .gitignore file. Prior to running the app, copy the ".env.example" file to a new .env file on the project root. Than, fill in the value for "AZURE_STORAGE_CONNECTION_STRING" with the value provided in the challenge submission email.

# 2. Running locally

## 2.1 - Pre-requisites

In order to run this project locally easily, you will need to have the following dependencies installed on your machine:

- Docker;
- Docker compose;

Optionally, you can also install "make" in order to use the provided Makefile which greatly simplifies some docker commands. To do so on a ubuntu machine, run:

```bash
sudo apt-get install build-essential
```

## 2.2 - Installing the dependencies

```bash
yarn
```

## 2.3 - Building

To build the app, you can either run:

```bash
docker-compose build
```

or, optionally if you have "make" installed:

```bash
make build
```

## 2.4 - Starting the containers

To start all the containers, run on a terminal:

```bash
docker-compose up -d
```

If you have "make" available on your machine, you can run:

```bash
make start
```

<h2 id="5">2.5 - Running the migrations</h2>

In order to build the necessary database structure, you will need to use typeorm run the app's migrations. You can do that from outside of the container, as long as the database is up and you have yarn or npm installed on your machine. In which case you can run:

```bash
yarn typeorm migration:run
```

If you do not have yarn/npm (or node for that matter), you can still run the migrations from inside of the server's container. To do that, run:

```bash
docker-compose exec app apk add bash
```

This will install bash on the container. This is necessary because the alpine image of node does not include bash by default. After that, run:

```bash
make login
```

or:

```bash
docker-compose exec app /bin/bash
```

With that you will be in a terminal inside the container. Now, enter the following command to run the migrations:

```bash
npm run typeorm migration:run
```

## 2.6 - Application logs

To see the server logs, run:

```bash
docker logs contact_server -f
```

If you have "make" available on your machine, you may also run:

```bash
make logs
```

# 3. Testing

The source code business logic layer follows the "use case" naming convention. Typescript files ended with "UseCase" where unit tested to guarantee the correct behavior of the app's functional requirements. Each "UseCase.ts" file is accompanied with a "UseCase.spec.ts" which is a test suite. To run the tests, enter the following on your terminal:

```bash
yarn test
```

If you do not have yarn installed on your local machine, follow the procedure described on <a href="#5">2.5 - Running the migrations</a> to install bash on the server container and start a terminal inside it. Once you have done that, run:

```bash
npm test
```

Other than unit tests, you may also want to actually use the application and verify it's functionality. To do that, you have two options:

1. Use a tool like **Insomnia** or **Postman** to send the http requests.
2. Use the swagger ui endpoint available at /api-docs.

If you decide to use an external tool, the "docs" folder contains a Insomnia collection exported describing all available api endpoints for you. With that, you can create an environment on your app to specify the "baseURL" variable and start making requests.

Under the "docs" folder you will also find a few csv files that you can use to test the app's functionality. They cover some of the possible scenarios that could occur in a real situation.
