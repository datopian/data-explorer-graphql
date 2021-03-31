import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Table from './Table'
import spinner from './spinner.svg'
const Query = require('graphql-query-builder')

function TableContainer({
  dataset,
  schema,
  filter,
  total,
  offset,
  setOffset,
  setPage,
  page,
  setTotal,
}) {
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map((item) => item.name))
    .filter(Object.assign(filter, { limit: 100, offset }))

  //since order _by format is asc and desc but the graphql string
  //containd this format as 'asc' and 'desc' this will always give error
  //hence we check theis string and remove the quote

  let queryString = datasetQuery.toString()

  if (queryString.includes('asc')) {
    queryString = queryString.replace('"asc"', 'asc')
  } else {
    queryString = queryString.replace('"desc"', 'desc')
  }

  const QUERY = gql`
    query Dataset {
      ${queryString}
    }
  `

  const { loading, error, data } = useQuery(QUERY)

  if (loading)
    return <img src={spinner} className="spinner" alt="Loading..." />

  if (error) return <p>Error :(</p>

  return (
    <div>
      <div className="overflow-auto table-container">
        <Table
          data={data[`${dataset}`]}
          schema={schema}
          dataset={dataset}
          total={total}
          page={page}
        />
      </div>
      <div className="data-explorer-pagination">
        <button
          className="first-button"
          onClick={() => {
            setPage(0)
            setOffset(0)
          }}
          disabled={page === 0}
        >
          First
        </button>
        <button
          className="prev-button"
          onClick={() => {
            setPage(page - 1)
            setOffset((page - 1) * 100)
          }}
          disabled={page === 0}
        >
          Previous
        </button>
        <div className="page-number">{page + 1}</div>
        <button
          className="next-button"
          onClick={() => {
            setPage(page + 1)
            setOffset((page + 1) * 100)
          }}
          disabled={page >= Math.floor(total / 100)}
        >
          Next
        </button>
        <button
          className="last-button"
          onClick={() => {
            const totalPages = Math.floor(total / 100)
            setPage(totalPages)
            setOffset(totalPages * 100)
          }}
          disabled={page >= Math.floor(total / 100)}
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default TableContainer
