import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import fileDownload from 'js-file-download'
const Query = require('graphql-query-builder')

export default function Download({ dataset, schema, filter, apiUri }) {
  const downloadQuery = new Query(dataset)
    .find(schema.fields.map((item) => item.name))
    .filter(Object.assign(filter, { limit: 10000 }))

  let queryString = downloadQuery.toString()

  if (queryString.includes('asc')) {
    queryString = queryString.replace('"asc"', 'asc')
  } else {
    queryString = queryString.replace('"desc"', 'desc')
  }

  const [selected, setSelected] = useState('json')
  const options = ['json', 'csv', 'xlsx', 'tsv', 'ods']
  const [downloading, setDownloading] = useState('')

  const handleChange = (event) => {
    setSelected(event.target.value)
  }

  const downloadData = () => {
    setDownloading('Preparing Download')
    fetch(`${apiUri}download?format=${selected}`, {
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
      .then((response) => {
        setDownloading('Downloading file')
        fileDownload(response, `data.${selected}`)
        setDownloading('Done.')
        setTimeout(() => setDownloading(''), 5000)
      })
      .catch((error) => setDownloading(error.message))
  }

  return (
    <div className="p-5 flex justify-around">
      Select format to Download:{' '}
      <select onChange={handleChange}>
        {options.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <button
        onClick={() => downloadData()}
        className="bg-blue-600 p-1 text-white  rounded-md"
      >
        {' '}
        Download{' '}
      </button>
      <p>{downloading}</p>
    </div>
  )
}
