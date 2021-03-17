import React, { useState } from 'react'
import Download from './Download'
import Filter from './Filter'
import TableContainer from './TableContainer'

function App({ dataset, schema, apiUri }) {
  const [filter, setFilter] = useState({})
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(0)

  return (
    <div className="max-w-2xl mx-auto mt-20 ">
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
      />
    </div>
  )
}

export default App
