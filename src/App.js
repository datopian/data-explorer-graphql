import React, { useState } from 'react'
import Download from './Download'
import Filter from './Filter'
import TableContainer from './TableContainer'

function App({ dataset, schema, apiUri }) {
  const [filter, setFilter] = useState({})
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
        setQuery={setQuery}
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
