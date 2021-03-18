import { render, act, screen } from '@testing-library/react'
import Table from './Table'
import React from 'react'
import { args } from './fixtures/args'
import results from './fixtures/results.json'

test('renders Table without failing', async () => {
  act(() => {
    render(
      <Table
        data={results['transmissionlines']}
        schema={args.schema}
        dataset={args.dataset}
        total={results['transmissionlines'].length}
      ></Table>
    )
  })
  expect(screen.getByTestId(/reactTable/i)).toBeInTheDocument()
})
