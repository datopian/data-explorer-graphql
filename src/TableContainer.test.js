import { render, cleanup, act, screen } from '@testing-library/react'
import TableContainer from './TableContainer'
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { args } from './fixtures/args'

jest.setTimeout(100000)
const client = new ApolloClient({
  uri: 'https://data-api.energidataservice.dk/v1/graphql',
  cache: new InMemoryCache(),
})

afterEach(cleanup)

test('renders learn react link', async () => {
  const { dataset, schema } = args
  const filter = {}
  const total = 0
  const offset = 0
  const setPage = () => {}
  const setQuery = () => {}

  act(() => {
    render(
      <ApolloProvider client={client}>
        <TableContainer
          dataset={dataset}
          schema={schema}
          filter={filter}
          total={total}
          offset={offset}
          setPage={setPage}
          setQuery={setQuery}
        ></TableContainer>
      </ApolloProvider>
    )
  })
  expect(screen.getByAltText(/Loading.../i)).toBeInTheDocument()
})
