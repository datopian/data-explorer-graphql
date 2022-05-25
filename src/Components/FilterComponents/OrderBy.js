import React from 'react'

function OrderBy({ orderColumnRef, orderByRef, fields }) {
  return (
    <div>
      <select
        ref={orderColumnRef}
        className="mr-2 my-2 p-2 border rounded"
        data-testid="data-ord"
      >
        {fields.map((value, index) => {
          return (
            <option value={value.name} key={index}>
              {value.title || value.name}
            </option>
          )
        })}
      </select>
      <select className="my-2 p-2 border rounded" ref={orderByRef} data-testid="ord-type">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  )
}

export default OrderBy
