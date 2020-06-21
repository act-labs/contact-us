# Contact Us project

Check [my blog](https://act-labs.github.io/posts/mysql-express/) for more details.

## Setup

Please make sure you have the following minimum requirements on your machine. The project should function on Mac or PC.

 - Node v12.16.1 or later
 - Yarn 1.22.4 or later
 - Docker

Run `yarn && yarn build-schema`

## To start servers

Run `yarn start`. Contact form page is open at `http://localhost:3000/`.


## Other useful commands

1. Page `http://localhost:8080/` - API status.
2. List of contacts: `http://localhost:8080/contacts`.
3. Seed database: `cd server; yarn seed <num>;`
4. To run tests: `yarn workspaces run test`
