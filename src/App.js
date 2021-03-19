import React, { useState } from 'react'
import Download from './Download'
import Filter from './Filter'
import TableContainer from './TableContainer'

function App({ dataset, schema, apiUri }) {
  //sort by the first date[time] column in desc order by default
  let initialFilter = {}
  const datetime = schema.fields.filter((val) => {
    return val.type === 'datetime' || val.type === 'date'
  })
  if (datetime.length > 0) {
    initialFilter = { order_by: { [datetime[0].name]: 'desc' } }
  }

  const [filter, setFilter] = useState(initialFilter)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-full mx-auto">
      <p data-testid="hidden-test"></p>
      <Download
        dataset={dataset}
        schema={schema}
        filter={filter}
        apiUri={apiUri}
      />
      <Filter
        dataset={dataset}
        schema={schema}
        filter={filter}
        setFilter={setFilter}
        total={total}
        setTotal={setTotal}
        setOffset={setOffset}
        setPage={setPage}
        query={query}
      />
      <TableContainer
        dataset={dataset}
        schema={schema}
        filter={filter}
        total={total}
        offset={offset}
        setOffset={setOffset}
        setPage={setPage}
        page={page}
        setQuery={setQuery}
      />
    </div>
  )
}

export default App
