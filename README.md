Data Explorer app based on GraphQL data API - https://github.com/datopian/data-api.

## Installation

Make sure that you have Data API service available locally. To set it up, please, follow instructions in https://github.com/datopian/data-api.

By default, Data Explorer app would expect GraphQL engine to be available at http://localhost:3000/v1/graphql. You can change it by editing `data-graphql` attribute in `/public/index.html`.

Install dependencies and start the app:

```
yarn && yarn start
```

## Deployment

1. Build the app:

```
yarn build
```

2. If you are using Hasura GraphQL API, you must update `.env` file with the hasura secret key on `REACT_APP_HASURA_KEY`

3. Move the bundles to your site. Make sure you have `div` elment with id `root` in the HTML. That element should provide following attributes:

* `data-graphql` - your GraphQL API endpoint.
* `data-dataset` - dataset name which should be a table/view name that we can query using GraphQL API.
* `data-schema` - tableschema for the dataset.
