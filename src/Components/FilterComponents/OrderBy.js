import React from 'react'

function OrderBy({ orderColumnRef, orderByRef, fields }) {
  return (
    <div>
      <select
        ref={orderColumnRef}
        className="mr-2 border"
        data-testid="data-ord"
      >
        {fields.map((value, index) => {
          return (
            <option value={value.name} key={index}>
              {value.title}
            </option>
          )
        })}
      </select>
      <select className="border" ref={orderByRef} data-testid="ord-type">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  )
}

export default OrderBy
