# transact-be
An api built using mongo db and GraphQL for transact-fe.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development

### Prerequisites

* node v6.11.3
* npm v3.10.10

### Installing

* Run npm install in this application folder
* Run npm run start:dev

### Querying using postman
* set request type to POST
* type localhost:4000/login on postman
* set content type t0 application/json
* enter id and name 
  {
    id: 7,
    name: Gaara
  }
* copy the token returned e.g irewirewpriwjfnow03490
* in a new tab, set request type to POST
* type localhost:4000/graphql on postman
* set content type t0 application/json
* set authorization header `jwt token` for example jwt irewirewpriwjfnow03490
* in the body, select raw and type in your query
  {
    "query": "{getAccount(id: 1) { name, id } }"
  }
* hit send


## Running the tests

Tests havent been written. I intend to use Jest/Jasmine

## Authors
* **Orkuma Ivo**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Naked blueberry smoothie
