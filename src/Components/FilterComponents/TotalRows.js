import React from 'react'
import { useQuery, gql } from '@apollo/client'
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
  const { error, data } = useQuery(QUERY)

  if (error) {
    console.log(error)
    return <p>Error :(</p>
  }

  if (data) {
    setTotal(data[`${dataset}_aggregate`].aggregate.count)
  }

  return (
    <div data-testid="agg" className="dq-heading-total-rows">
      Total rows: {total && total.toLocaleString()}
    </div>
  )
}

export default TotalRows
