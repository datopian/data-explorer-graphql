import React, { useState, useEffect } from 'react'
import fileDownload from 'js-file-download'
import spinner from './spinner.svg'
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

  const [format, setFormat] = useState('csv')
  const options = ['json', 'csv', 'xlsx']
  const [showSpinner, setShowSpinner] = useState(false)

  const handleChange = (event) => {
    setFormat(event.target.value)
  }

  const downloadData = (extension) => {
    setShowSpinner(true)
    fetch(`${apiUri}download?format=${extension || format}`, {
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
          setShowSpinner(false)
          throw new Error(response.statusText)
        }
        return response.blob()
      })
      .then((blob) => {
        fileDownload(
          blob,
          `${dataset}_${new Date().toLocaleDateString()}.${
            extension || format
          }`
        )
        setShowSpinner(false)
      })
      .catch((error) => setShowSpinner(false))
  }

  useEffect(() => {
    // Add event listener to Download buttons outside of React app
    const downloadButtons = document.getElementsByClassName('download-data')
    for (let button of downloadButtons) {
      // When query string is changed, we need to re-attach click event listner
      // to the download buttons. We also need to remove all old event listners.
      // Cloning and replacing the button is one of the options of doing so and
      // it is efficient enough as the element doesn't have children.
      const newButton = button.cloneNode(true)
      const downloadFunction = () => {
        downloadData(newButton.value)
      }
      newButton.addEventListener('click', downloadFunction, true)
      button.parentNode.replaceChild(newButton, button)
    }
  }, [queryString])

  return (
    <>
      {showSpinner && (
        <div className="spinner-container">
          <img
            src={spinner}
            className="spinner spinner-download"
            alt="Loading..."
          />
        </div>
      )}
      <div className="data-download-default">
        <button
          onClick={() => downloadData()}
          data-testid="download-data"
          className="border border-black rounded py-1 px-2"
        >
          {' '}
          Download CSV{' '}
        </button>
      </div>
    </>
  )
}
