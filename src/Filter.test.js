import {
  render,
  act,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react'
import user from '@testing-library/user-event'
import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { args } from './fixtures/args'
import { results } from './fixtures/results.json'
import Filter from './Filter'
import Query from 'graphql-query-builder'

describe('Filter Component', () => {
  beforeEach(async () => {
    const setFilter = jest.fn()
    const setTotal = jest.fn()

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
          <Filter
            {...args}
            filter={{}}
            setFilter={setFilter}
            setTotal={setTotal}
          />
        </MockedProvider>
      )
      await new Promise((resolve) => setTimeout(resolve, 100))
    })
  })
  afterEach(cleanup)

  it('should properly render all fields', async () => {
    expect(screen.getByTestId(/agg/i)).toBeInTheDocument()
    expect(screen.getByTestId(/all-fields/i)).toBeInTheDocument()
    expect(screen.getByTestId(/field-container/i)).toBeInTheDocument()
    expect(screen.getByTestId(/data-ord/i)).toBeInTheDocument()
  })

  it('adding of search fields', () => {
    user.click(screen.getByTestId('rules'))
    const add = screen.getByTestId(/add/i)
    user.click(add)
    expect(screen.getAllByText(/\+/i).length).toBe(2)
  })

  it('adding and deleting of search field', () => {
    user.click(screen.getByTestId('rules'))
    const add = screen.getByTestId(/add/i)
    user.click(add)
    expect(screen.getAllByText(/\+/i).length).toBe(2)
    user.click(screen.queryAllByTestId(/remove/i)[1])
    expect(screen.getAllByText(/\+/i).length).toBe(1)
  })

  it('should select a schema field and filled with value', async () => {
    user.click(screen.getByTestId('rules'))
    fireEvent.change(screen.getAllByTestId('field')[1], {
      target: { value: 'ConnectedArea' },
    })
    const select = screen.getAllByTestId('field')[1]
    expect(select.value).toBe('ConnectedArea')

    await user.type(screen.getAllByTestId('field-value')[0], 'DK2')

    expect(screen.getAllByTestId('field-value')[0].value).toBe('DK2')
    user.click(screen.getByText(/Submit/i))
  })

  it('should fill in the right logic', async () => {
    user.click(screen.getByTestId('rules'))
    fireEvent.change(screen.getAllByTestId('field')[1], {
      target: { value: 'ConnectedArea' },
    })
    const select = screen.getAllByTestId('field')[1]
    expect(select.value).toBe('ConnectedArea')

    fireEvent.change(screen.getByTestId('logic'), {
      target: { value: '_neq' },
    })
    const logic = screen.getByTestId('logic')
    expect(logic.value).toBe('_neq')

    await user.type(screen.getByTestId('field-value'), 'DK1')

    expect(screen.getByTestId('field-value').value).toBe('DK1')

    user.click(screen.getByText(/Submit/i))
  })

  it('should remain filter after click on submit', async () => {
    user.click(screen.getByTestId('rules'))
    fireEvent.change(screen.getAllByTestId('field')[1], {
      target: { value: 'ConnectedArea' },
    })
    const select = screen.getAllByTestId('field')[1]
    expect(select.value).toBe('ConnectedArea')

    await user.type(screen.getAllByTestId('field-value')[0], 'SE4')

    user.click(screen.getByText(/Submit/i))
    expect(screen.getAllByTestId('field-value')[0].value).toBe('SE4')
  })

  it('should select the right order', async () => {
    user.click(screen.getByTestId('rules'))
    fireEvent.change(screen.getAllByTestId('field')[1], {
      target: { value: 'ConnectedArea' },
    })
    const select = screen.getAllByTestId('field')[1]
    expect(select.value).toBe('ConnectedArea')

    fireEvent.change(screen.getByTestId('logic'), {
      target: { value: '_neq' },
    })
    const logic = screen.getByTestId('logic')
    expect(logic.value).toBe('_neq')

    await user.type(screen.getByTestId('field-value'), 'DK1')

    expect(screen.getByTestId('field-value').value).toBe('DK1')

    fireEvent.change(screen.getByTestId('ord-type'), {
      target: { value: 'desc' },
    })
    const order = screen.getByTestId('ord-type')
    expect(order.value).toBe('desc')

    user.click(screen.getByText(/Submit/i))
  })
})
