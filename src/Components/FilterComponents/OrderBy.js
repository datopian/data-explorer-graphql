import React from 'react'

function OrderBy({ orderColumnRef, orderByRef, fields }) {
  return (
    <div className="mb-2 border pl-2 pb-2 pt-2">
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
        <select
          className="bg-white border-2"
          ref={orderByRef}
          data-testid="ord-type"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  )
}

export default OrderBy
