import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateTime({ columnName, setInputStates, index, fields }) {
  const [startDate1, setStartDate1] = useState()
  const [startDate2, setStartDate2] = useState()

  const handleDate = function (columnName, date, type) {
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
        setStartDate1(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          newdata[index]['logicValue'][0] = '_gte'
          newdata[index]['inputValue'][0] = timeString
          return newdata
        })
      } else {
        setStartDate2(date)
        setInputStates((prevState) => {
          const newdata = prevState.slice()
          newdata[index]['logicValue'][1] = '_lt'
          newdata[index]['inputValue'][1] = timeString
          return newdata
        })
      }
    } else {
      if (type === 'type1') {
        setStartDate1(date)
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
        setStartDate2(date)
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
    <div className="dq-date-picker">
      <DatePicker
        selected={startDate1}
        onChange={(date) => handleDate(columnName, date, 'type1')}
        format="yyyy-MM-dd"
        clearIcon="X"
      />
      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      <DatePicker
        selected={startDate2}
        onChange={(date) => handleDate(columnName, date, 'type2')}
        format="yyyy-MM-dd"
        clearIcon="X"
      />
    </div>
  )
}

export default DateTime
