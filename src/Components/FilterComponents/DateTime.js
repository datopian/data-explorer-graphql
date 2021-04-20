import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

function DateTime({
  columnName,
  setInputStates,
  index,
  fields,
  setCopyDisabled,
}) {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleDate = function (columnName, date, type) {
    setCopyDisabled(true)
    if (date) {
      const dDate = date.toISOString().slice(0, 10)
      const hour = date.getHours()
      const minute = date.getMinutes().toString()
      let timeString = null

      const examples = fields.filter((val) => val.name === columnName)[0][
        'example'
      ]
      const isISO = examples.includes('Z')

      if (isISO) {
        timeString = `${dDate} ${hour}:${minute}${
          minute.length > 1 ? 'Z' : '0Z'
        }`
      } else {
        timeString = `${dDate} ${hour}:${minute}`
      }

      if (type === 'type1') {
        setStartDate(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          newdata[index]['logicValue'][0] = '_gte'
          newdata[index]['inputValue'][0] = timeString
          return newdata
        })
      } else {
        setEndDate(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          newdata[index]['logicValue'][1] = '_lt'
          newdata[index]['inputValue'][1] = timeString
          return newdata
        })
      }
    } else {
      if (type === 'type1') {
        setStartDate(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          console.log(newdata)
          if (newdata[index].logicValue.length >= 1) {
            newdata[index].logicValue.splice(0, 1)
            newdata[index].inputValue.splice(0, 1)
          }
          return newdata
        })
      } else {
        setEndDate(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          if (newdata[index].logicValue.length === 1) {
            newdata[index].logicValue.splice(0, 1)
            newdata[index].inputValue.splice(0, 1)
          } else if (newdata[index].logicValue.length > 1) {
            newdata[index].logicValue.splice(1, 1)
            newdata[index].inputValue.splice(1, 1)
          }
          return newdata
        })
      }
    }
  }

  return (
    <>
      <DatePicker
        value={startDate}
        onChange={(date) => handleDate(columnName, date, 'type1')}
        format="yyyy-MM-dd"
        clearIcon="X"
        nativeInputAriaLabel="Start date input box"
        dayAriaLabel="Start day"
        monthAriaLabel="Start month"
        yearAriaLabel="Start year"
      />
      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      <DatePicker
        value={endDate}
        onChange={(date) => handleDate(columnName, date, 'type2')}
        format="yyyy-MM-dd"
        clearIcon="X"
        nativeInputAriaLabel="End date input box"
        dayAriaLabel="End day"
        monthAriaLabel="End month"
        yearAriaLabel="End year"
      />
    </>
  )
}

export default DateTime
