import { render, act, cleanup, screen } from '@testing-library/react'
import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { args } from './fixtures/args'
import { results } from './fixtures/results.json'
import App from './App'
import Query from 'graphql-query-builder'

beforeAll(async () => {
  let FILTER_QUERY
  let mocks

  const getTotalRows = new Query(`${args.dataset}_aggregate`).find(
    new Query('aggregate').find('count')
  )

  FILTER_QUERY = gql`query Dataset {
                        ${getTotalRows}
                    }`
  mocks = [
    {
      request: {
        query: FILTER_QUERY,
      },
      result: {
        results,
      },
    },
  ]

  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App {...args} />
      </MockedProvider>
    )
    await new Promise((resolve) => setTimeout(resolve, 100))
  })
})

afterAll(cleanup)

test('renders App component', async () => {
  const linkElement = screen.getByTestId(/hidden-test/i)
  expect(linkElement).toBeInTheDocument()
  expect(screen.getByTestId(/agg/i)).toBeInTheDocument()
  expect(screen.getByTestId(/all-fields/i)).toBeInTheDocument()
  expect(screen.getByTestId(/field-container/i)).toBeInTheDocument()
})
