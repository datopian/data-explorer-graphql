import React from 'react'
import DateTime from './DateTime'

function SelectFilter({
  setInputStates,
  inputState,
  inputStates,
  index,
  fields,
  logics,
}) {
  const handleChange = function (e) {
    const name = e.target.name
    const value = e.target.value

    setInputStates((prevState) => {
      const newdata = prevState.slice()
      newdata[index][name][0] = value
      if (
        name === 'columnName' &&
        schemaType(value) !== 'datetime' &&
        schemaType(value) !== 'date'
      ) {
        newdata[index]['logicValue'][0] = '_eq'
      }
      return newdata
    })
  }

  const add = function (e) {
    e.preventDefault()

    setInputStates((prevState) => {
      const newState = prevState.slice()
      newState.push({ columnName: [''], logicValue: [], inputValue: [] })
      return newState
    })
  }

  const remove = function (e) {
    e.preventDefault()
    if (inputStates.length > 1) {
      //only delete if the filter field is more than one
      setInputStates((prevState) => {
        const newState = prevState.slice()
        newState.splice(index, 1)
        return newState
      })
    }
  }

  const schemaType = function (columnName) {
    if (columnName) {
      const dtype = fields.filter((val) => val.name === columnName)[0]
      return dtype['type']
    }
  }

  return (
    <div className="mb-2" data-testid="field-container">
      <select
        className="mr-2 border"
        onChange={handleChange}
        value={inputState.columnName[0]}
        name="columnName"
        data-testid="field"
      >
        <option>--select a field--</option>
        {fields.map((value, index) => {
          return (
            <option value={value.name} key={index}>
              {value.title}
            </option>
          )
        })}
      </select>
      {schemaType(inputState.columnName[0]) === 'datetime' ||
      schemaType(inputState.columnName[0]) === 'date' ? (
        ''
      ) : (
        <select
          className="mr-2"
          onChange={handleChange}
          value={inputState.logicValue[0]}
          name="logicValue"
          data-testid="logic"
        >
          {Object.keys(logics).map((value, index) => {
            return (
              <option value={logics[value]} key={index}>
                {value}
              </option>
            )
          })}
        </select>
      )}

      {schemaType(inputState.columnName[0]) === 'datetime' ||
      schemaType(inputState.columnName[0]) === 'date' ? (
        <DateTime
          columnName={inputState.columnName[0]}
          setInputStates={setInputStates}
          index={index}
          fields={fields}
        />
      ) : (
        <input
          type="text"
          className="mr-2 border"
          onChange={handleChange}
          value={inputState.inputValue}
          name="inputValue"
          data-testid="field-value"
        />
      )}
      <button className="mr-2" onClick={remove} data-testid="remove">
        -
      </button>
      <button onClick={add} data-testid="add">
        +
      </button>
    </div>
  )
}

export default SelectFilter
