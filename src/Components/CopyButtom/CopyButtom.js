import React from 'react'

export default function CopyButton({ query }) {
  console.log(query)

  const copyQuery = () => {
    const area = document.createElement('textarea')
    area.value = query
    document.body.appendChild(area)
    area.focus()
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }

  return (
    <button
      className="bg-blue-600 bg-opacity-75 p-2 text-white  rounded-md mr-4"
      onClick={() => copyQuery()}
    >
      Copy Query
    </button>
  )
}
