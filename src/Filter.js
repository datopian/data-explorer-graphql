import React, { useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client';
const Query = require('graphql-query-builder');


function Filter({ dataset, schema, filter, setFilter }) {
  const getTotalRows = new Query(`${dataset}_aggregate`)
    .find(new Query('aggregate').find('count'));

  // getTotalRows.filter({where: {ConnectedArea: {_eq: 'DK1'}}});
  const QUERY = gql`
    query Dataset {
      ${getTotalRows} 
    }
  `;

  
  const [inputStates, setInputStates] = useState([{columnName:'', logicValue: '_eq', inputValue: ''}])
  const orderColumnRef = useRef()
  const orderByRef = useRef()

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
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
      whereVariables[value.columnName] = { [value.logicValue] : value.inputValue}
    });

    filterVariables['where'] = whereVariables;

    const orderColumn = orderColumnRef.current.value;
    const orderBy = orderByRef.current.value;
    filterVariables['order_by'] = {[orderColumn]: orderBy}
    filterVariables['limit'] = 100
    
    setFilter(filterVariables);
  }
  
  return (
    <>
    <div>
      Total rows: {data[`${dataset}_aggregate`].aggregate.count}
    </div>
    <form>
      <div className='mb-2 border pl-2'>
        {inputStates.map((value, index) => {

          return <SelectFilter setInputStates={setInputStates} fields={schema.fields} logics={logics} 
                             inputStates={value} index={index} key={index}/>
        })}
      </div>
      
    </form>
    <OrderBy orderColumnRef={orderColumnRef} orderByRef={orderByRef} fields={schema.fields}/>
    <button onClick={()=> { filterTable()}} className='bg-blue-600 p-2 text-white  rounded-md'>filter</button>
    </>
    
  );
}





function SelectFilter({setInputStates, inputStates, index, fields, logics}){

  const handleChange = function(e){
    
    const name = e.target.name;
    const value = e.target.value;

    setInputStates((prevState) =>{
      const newdata = prevState.slice();
      newdata[index][name] = value;
      return newdata;
    });
  }

  const add = function(e){
    e.preventDefault();
    
    setInputStates((prevState) => {
      const newState = prevState.slice();
      newState.push({columnName:'', logicValue: '_eq', inputValue: ''})
      return newState
    });
  }

  const remove = function(e){
    e.preventDefault();
    setInputStates((prevState) => {
      const newState = prevState.slice();
      newState.splice(index,1);
      return newState;
    });
  }

  return (
    <div className='mb-2'>
      <select className='mr-2 border' onChange={handleChange} value={inputStates.columnName} name="columnName">
        {fields.map((value, index) => {
          return <option value={value.name}>{ value.title}</option>
        })}
      </select>
      <select className='mr-2' onChange={handleChange} value={inputStates.logicValue} name="logicValue" >
        {Object.keys(logics).map((value, index) => {
          return <option value={logics[value]}>{ value}</option>
        })}
      </select>
      <input type='text' className='mr-2 border' onChange={handleChange} value={inputStates.inputValue} name="inputValue"/>
      <button className='mr-2' onClick={remove}>-</button>
      <button onClick={add}>+</button>

    </div>
  );
}

function OrderBy({orderColumnRef, orderByRef, fields}) {

  return (
    <div  className='mb-2 border pl-2 pb-2 pt-2'>
      <div>Order by</div>
      <div>
        <select ref={orderColumnRef} className='mr-2 border'>
          {fields.map((value, index) => {
            return <option value={value.name}>{ value.title}</option>
          })}
        </select>
        <select className='bg-white border-2' ref={orderByRef}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}


export default Filter;
