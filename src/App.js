import React, { useState, useEffect } from 'react'
import Download from './Download'
import Filter from './Filter'
import TableContainer from './TableContainer'

function App({ dataset, schema, apiUri }) {
  const [filter, setFilter] = useState({})
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(0)

  useEffect(() =>{
    const datetime = schema.fields.filter(val => {
      return val.type === "datetime" || val.type === "date"
    })
    //sort by the first date[time] column
    if (datetime.length > 0) {
      setFilter({order_by:{[datetime[0].name]: 'desc'}})
    }
  },[])

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
