import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Error from '../Error'
import spinner from '../../spinner.svg'
const Query = require('graphql-query-builder')

function TotalRows({ newFilter, dataset, setTotal, total }) {
  const getTotalRows = new Query(`${dataset}_aggregate`)
    .filter(newFilter)
    .find(new Query('aggregate').find('count'))

  const QUERY = gql`
    query Dataset {
      ${getTotalRows}
    }
  `
  const { loading, error, data } = useQuery(QUERY)

  if (loading)
    return <img src={spinner} className="spinner" alt="Loading..." />
  if (error) {
    return <Error error={error} />
  }

  if (data) {
    setTotal(data[`${dataset}_aggregate`].aggregate.count)
  }

  return (
    <div data-testid="agg" className="dq-heading-total-rows my-4">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="px-4 py-5 bg-white shadow rounded overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total entries</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{total && total.toLocaleString()}</dd>
        </div>
      </dl>
    </div>
  )
}

export default TotalRows
