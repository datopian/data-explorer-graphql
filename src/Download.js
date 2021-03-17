import React, { useState } from 'react'
import fileDownload from 'js-file-download'
const Query = require('graphql-query-builder')

export default function Download({ dataset, schema, filter, apiUri }) {
  // Remove offset and limit from filter:
  const copyOfFilter = JSON.parse(JSON.stringify(filter))
  delete copyOfFilter.limit
  delete copyOfFilter.offset

  const downloadQuery = new Query(dataset)
    .find(schema.fields.map((item) => item.name))
    .filter(copyOfFilter)

  let queryString = downloadQuery.toString()

  if (queryString.includes('asc')) {
    queryString = queryString.replace('"asc"', 'asc')
  } else {
    queryString = queryString.replace('"desc"', 'desc')
  }

  const [format, setFormat] = useState('json')
  const options = ['json', 'csv', 'xlsx']
  const [downloading, setDownloading] = useState('')

  const handleChange = (event) => {
    setFormat(event.target.value)
  }

  const downloadData = () => {
    setDownloading('Preparing Download')
    fetch(`${apiUri}download?format=${format}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'blob',
      body: JSON.stringify({
        query: `query Dataset {
                    ${queryString}
                    }
                  `,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.blob()
      })
      .then((blob) => {
        setDownloading('Downloading file')
        fileDownload(blob, `data.${format}`)
        setDownloading('Done.')
        setTimeout(() => setDownloading(''), 5000)
      })
      .catch((error) => setDownloading(error.message))
  }

  return (
    <>
      <select onChange={handleChange}>
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button
        onClick={() => downloadData()}
        className="bg-blue-600 p-1 text-white"
      >
        {' '}
        Download{' '}
      </button>
      <p>{downloading}</p>
    </>
  )
}
