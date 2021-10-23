# Motivation

This repository contains the source code implementation of the "Contact Importer" challenge app.

# Running locally

## 1. Pre-requisites

In order to run this project locally easily, you will need to have the following dependencies installed on your machine:

- Docker;
- Docker compose;

Optionally, you can also install "make" in order to use the provided Makefile which greatly simplifies some docker commands. To do so on a ubuntu machine, run:

```bash
sudo apt-get install build-essential
```

## 2. Installing the dependencies

```bash
yarn
```

## 3. Building

To build the app, you can either run:

```bash
docker-compose build
```

or, optionally if you have "make" installed:

```bash
make build
```

## 4. Starting the containers

<h2 id="5">5. Running the migrations</h2>

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

## 6. Testing

The source code business logic layer follows the "use case" naming convention. Typescript files ended with "UseCase" where unit tested to guarantee the correct behavior of the app's functional requirements. Each "UseCase.ts" file is accompanied with a "UseCase.spec.ts" which is a test suite. To run the tests, enter the following on your terminal:

```bash
yarn test
```

If you do not have yarn installed on your local machine, follow the procedure described on <a href="#5">"5. Running the migrations"</a> to install bash on the server container and start a terminal inside it. Once you have done that, run:

```bash
npm test
```
