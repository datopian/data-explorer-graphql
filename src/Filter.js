import React, { useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import { SelectFilter, OrderBy } from './Components/FilterComponents'
import spinner from './spinner.svg'
import CopyButton from './Components/CopyButton'
const Query = require('graphql-query-builder')

function Filter({
  dataset,
  schema,
  filter,
  setFilter,
  total,
  setTotal,
  setOffset,
  setPage,
}) {
  const [copyDisabled, setCopyDisabled] = useState(false)
  const newFilter = {}

  if (filter && filter.where) Object.assign(newFilter, { where: filter.where })

  const getTotalRows = new Query(`${dataset}_aggregate`)
    .filter(newFilter)
    .find(new Query('aggregate').find('count'))

  // getTotalRows.filter({where: {ConnectedArea: {_eq: 'DK1'}}});
  const QUERY = gql`
    query Dataset {
      ${getTotalRows}
    }
  `

  const [inputStates, setInputStates] = useState([
    { columnName: [''], logicValue: [], inputValue: [] },
  ])

  const orderColumnRef = useRef()
  const orderByRef = useRef()
  const [addRules, setAddRules] = useState(false)

  const { loading, error, data } = useQuery(QUERY)

  if (loading)
    return <img src={spinner} className="spinner" alt="Loading..." />
  if (error) {
    console.log(error)
    return <p>Error :(</p>
  }

  if (data) {
    setTotal(data[`${dataset}_aggregate`].aggregate.count)
  }

  const logics = {
    '==': '_eq',
    '<': '_lt',
    '>': '_gt',
    '<=': '_lte',
    '!=': '_neq',
    '>=': '_gte',
  }

  const filterTable = function () {
    setCopyDisabled(false)
    const whereVariables = {}
    const filterVariables = {}
    inputStates.forEach((value, index) => {
      if (value.inputValue[0]) {
        // ensure no empty input value
        whereVariables[value.columnName[0]] = {}
        value.logicValue.forEach((val, index) => {
          const logic = value.logicValue[index]
          const input = value.inputValue[index]
          whereVariables[value.columnName[0]][logic] = input
        })
      } else if (value.inputValue.length === 2 && value.inputValue[1]) {
        //if the first inputvalue for date[time] is undefined
        // hence the second index must contain a date[time] value
        whereVariables[value.columnName[0]] = {}
        const logic = value.logicValue[1]
        const input = value.inputValue[1]
        whereVariables[value.columnName[0]][logic] = input

      }
    })
    filterVariables['where'] = whereVariables

    const whereKeys = Object.keys(whereVariables)
    const length = whereKeys.length
    const isFilled = length === 1 ? whereKeys[0].length : true

    if (isFilled) {
      filterVariables['where'] = whereVariables
    }

    const orderColumn = orderColumnRef.current.value
    const orderBy = orderByRef.current.value
    filterVariables['order_by'] = { [orderColumn]: orderBy }
    filterVariables['limit'] = 100

    setFilter(filterVariables)
  }

  const resetFilter = function () {
    // reset the inputstates to one if multiple exist
    if (inputStates[0].inputValue.length || inputStates.length > 1) {
      setInputStates([{ columnName: [''], logicValue: [], inputValue: [] }])
      setOffset(0)
      setPage(0)
      setAddRules(false)
      setFilter({})
      setCopyDisabled(false)
    }
  }

  const handleRules = function () {
    setInputStates((prevState) => {
      const newState = prevState.slice()
      newState.push({ columnName: [''], logicValue: ['_eq'], inputValue: [] })
      return newState
    })
    setAddRules(true)
  }

  return (
    <div className="dq-main-container">
      <div className="dq-heading">
        <div className="dq-heading-main"></div>
        <div data-testid="agg" className="dq-heading-total-rows">
          <span className="dq-h-total-rows">Total rows: </span> <span className="dq-p-total-rows">{total}</span>
        </div>
      </div>
      <div>
        <form >
          <div data-testid="all-fields" className="form-filter">
            <div>
              <p className="order-p">Filter</p>
            </div>
            <div className="dq-date-picker">
              <SelectFilter
                setInputStates={setInputStates}
                fields={schema.fields}
                logics={logics}
                inputState={inputStates[0]}
                inputStates={inputStates}
                index={0}
                setAddRules={setAddRules}
                setCopyDisabled={setCopyDisabled}
              />
            </div>
            <div className="dq-body">
              {addRules ? (
                inputStates.slice(1).map((value, index) => {
                  return (
                    <div className="dq-date-picker">
                      <SelectFilter
                        setInputStates={setInputStates}
                        fields={schema.fields}
                        logics={logics}
                        inputState={value}
                        inputStates={inputStates}
                        index={index + 1}
                        key={index + 1}
                        setAddRules={setAddRules}
                        setCopyDisabled={setCopyDisabled}
                      />
                    </div>
                  )
                })
              ) : (
                <button
                  className="btn btn-default dq-rule-add"
                  onClick={() => handleRules()}
                  data-testid="rules"
                >
                  Add a rule
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="dq-rule-submit dq-footer">
        <div>
          <OrderBy
            orderColumnRef={orderColumnRef}
            orderByRef={orderByRef}
            fields={schema.fields}
          />
        </div>
        <div className="action-btns">
          <button
            onClick={() => {
              filterTable()
            }}
            className="btn btn-primary submit-button"
          >
            Submit
          </button>
          <button
            onClick={() => {
              resetFilter()
            }}
            className="btn btn-primary reset-button"
          >
            Reset
          </button>
          <CopyButton
            dataset={dataset}
            schema={schema}
            filter={filter}
            disabled={copyDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
