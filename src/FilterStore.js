import React, { useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client';
import { SelectFilter, OrderBy } from './Components/FilterComponents';
const Query = require('graphql-query-builder');


function Filter({ dataset, schema, filter, setFilter, total, setTotal, setOffset, setPage }) {

  const getTotalRows = new Query(`${dataset}_aggregate`)
    .find(new Query('aggregate').find('count'));

  // getTotalRows.filter({where: {ConnectedArea: {_eq: 'DK1'}}});
  const QUERY = gql`
    query Dataset {
      ${getTotalRows}
    }
  `;


  const [inputStates, setInputStates] = useState([{columnName:[''], logicValue: [], inputValue: []}])
  const orderColumnRef = useRef()
  const orderByRef = useRef()
  const [addRules, setAddRules] = useState(false);

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    if (data) {
      setTotal(data[`${dataset}_aggregate`].aggregate.count);
    }

  const logics = {
    '==' : '_eq',
    '<' : '_lt',
    '>' : '_gt',
    '<=' : '_lte',
    '!=' : '_neq',
    '>=' : '_gte',
  }
  const filterTable = function() {
    const whereVariables = {};
    const filterVariables = {}
    inputStates.forEach((value, index) => {
      
      if (value.inputValue[0]) { // ensure no empty input value
        whereVariables[value.columnName[0]] = {}
        value.logicValue.forEach((val, index)=> {
          const logic = value.logicValue[index];
          const input = value.inputValue[index];
          whereVariables[value.columnName][logic] = input;
        })
      }
      
    });
    filterVariables['where'] = whereVariables;

    const whereKeys = Object.keys(whereVariables);
    const length = whereKeys.length
    const isFilled = length === 1 ? whereKeys[0].length : true;

    if( isFilled) {
      filterVariables['where'] = whereVariables;
    }
    
    const orderColumn = orderColumnRef.current.value;
    const orderBy = orderByRef.current.value;
    filterVariables['order_by'] = {[orderColumn]: orderBy}
    filterVariables['limit'] = 100

    setFilter(filterVariables);
  }

  const resetFilter = function() {
    // reset the inputstates to one if multiple exist
    if (inputStates.length > 1 ) {
      setInputStates([{columnName:[''], logicValue: [], inputValue: []}]);
    }
    setOffset(0)
    setPage(0)
    setAddRules(false)
    setFilter({})
  }

  const handleRules = function() {
    setInputStates((prevState) => {
      const newState = prevState.slice();
      newState.push({columnName:[''], logicValue: ['_eq'], inputValue: []})
      return newState
    });
    setAddRules(true)
  }

  return (
    <>
    <div data-testid='agg'>
      Total rows: {total}
    </div>
    <form>
      <div className='mb-2 border pl-2' data-testid='all-fields'>
        <SelectFilter setInputStates={setInputStates} fields={schema.fields} logics={logics}
                             inputState={inputStates[0]} inputStates={inputStates} index={0} setAddRules={setAddRules}/>
        
        {addRules ? inputStates.slice(1).map((value, index) => {
          
          return <SelectFilter setInputStates={setInputStates} fields={schema.fields} logics={logics}
                             inputState={value} inputStates={inputStates} index={index+1} key={index+1} setAddRules={setAddRules}/>

        }) : <button className="bg-green-400 p-2 text-white  rounded-md'" onClick={()=> handleRules()} data-testid="rules">Add Rules</button>}
      </div>

    </form>
    <OrderBy orderColumnRef={orderColumnRef} orderByRef={orderByRef} fields={schema.fields}/>
    <div>
        <button onClick={()=> { filterTable()}} className='bg-blue-600 p-2 text-white  rounded-md mr-4'>Submit</button>
        <button onClick={()=> { resetFilter()}} className='bg-green-600 p-2 text-white  rounded-md'>Reset</button>
    </div>
    
    </>

  );
}

export default Filter;