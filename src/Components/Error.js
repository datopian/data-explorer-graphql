import React from 'react'

export default function Error({ error }) {
  return (
    <div className="text-center font-medium font-serif text-red-600 rounded-md bg-red-200 w-1/2">
      <p>{error.toString()}</p>
    </div>
  )
}
