import React, { useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

export default function Download({ query }) {
  const [selected, setSelected] = useState('json')
  const options = ['json', 'csv', 'xlsx', 'tsv', 'ods']
  const [downloading, setDownloading] = useState('')

  const handleChange = (event) => {
    setSelected(event.target.value)
  }

  const downloadData = () => {
    setDownloading('Preparing Download')
    axios(
      `https://data-api.energidataservice.dk/v1/download?format=${selected}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
        data: {
          query: `query Dataset {
                    ${query}
                    }
                  `,
        },
      }
    )
      .then((response) => {
        setDownloading('Downloading file')
        fileDownload(response.data, `data.${selected}`)
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
