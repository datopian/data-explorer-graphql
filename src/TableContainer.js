import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import Query from 'graphql-query-builder'
import Table from './Table'

function TableContainer({
  dataset,
  schema,
  filter,
  total,
  offset,
  setOffset,
  setPage,
  page,
}) {
  const [dataObject, setDataObject] = useState({ [`${dataset}`]: [] })
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

  const { error, data } = useQuery(QUERY)

  useEffect(() => {
    if (data) {
      setDataObject(data)
    }
  }, [data])

  if (error) return <p>Error :(</p>

  console.log(dataObject)
  return (
    <div>
      <div className="overflow-auto table-container">
        <Table
          data={dataObject[`${dataset}`]}
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
