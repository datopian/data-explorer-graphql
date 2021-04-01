import React from 'react'
import { useQuery, gql } from '@apollo/client'
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
    console.log(error)
    return <p>Error :(</p>
  }

  if (data) {
    setTotal(data[`${dataset}_aggregate`].aggregate.count)
  }

  return (
    <div data-testid="agg" className="dq-heading-total-rows">
      <span className="dq-h-total-rows">Total rows: </span> <span className="dq-p-total-rows">{total && total.toLocaleString()}</span>
    </div>
  )
}

export default TotalRows
