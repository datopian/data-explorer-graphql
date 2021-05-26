Data Explorer app based on GraphQL data API - https://github.com/datopian/data-api.

[![deploy](https://github.com/datopian/data-explorer-graphql/actions/workflows/deploy.yml/badge.svg)](https://github.com/datopian/data-explorer-graphql/actions/workflows/deploy.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Live demo: [![demo](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)](https://datopian.github.io/data-explorer-graphql/)

## Features

- Table preview of the data + pagination
- Filter data by any of the fields
- Preview the filtered data
- Download data in various formats
- Download filtered data in various formats

## Development

Make sure that you have Data API service available locally. To set it up, please, follow instructions in https://github.com/datopian/data-api.

By default, Data Explorer app would expect GraphQL engine to be available at http://localhost:3333/v1/graphql. You can change it by editing `data-api` attribute in `/public/index.html`.

Install dependencies and start the app:

```
yarn && yarn start
```

## Deployment

1. Build the app:

```
yarn build
```

2. Move the bundles to your site. Make sure you have `div` elment with id `root` in the HTML. That element should provide following attributes:

- `data-api` - your GraphQL API endpoint, e.g., `https://data-api.com/v1/`.
- `data-dataset` - dataset name which should be a table/view name that we can query using GraphQL API.
- `data-schema` - tableschema for the dataset.

## Tests

To run the integration tests in CLI:

```
yarn e2e
```

To run the integration tests in GUI:

```
yarn cypress:open
```

## License

This project is licensed under the MIT License - see the [LICENSE](License) file for details.
