import React, { useState } from 'react'
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

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const logics = {
    '==' : '_eq',
    '<' : '_lt'
  }
  const filterTable = function() {
    const filterVariables = {};

    inputStates.forEach((value, index) => {
      filterVariables[value.columnName] = { [value.logicValue] : value.inputValue}
    });
    setFilter(filterVariables);
  }
  
  return (
    <>
    <div>
      Total rows: {data[`${dataset}_aggregate`].aggregate.count}
    </div>
    <form>
      {inputStates.map((value, index) => {

        return <SelectFilter setInputStates={setInputStates} fields={schema.fields} logics={logics} 
                             inputStates={value} index={index} key={index}/>
      })}
    </form>
    
    <button onClick={()=> { filterTable()}}>filter</button>
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
    <div>
      <select className='mr-2' onChange={handleChange} value={inputStates.columnName} name="columnName">
        {fields.map((value, index) => {
          return <option value={value.name}>{ value.title}</option>
        })}
      </select>
      <select className='mr-2' onChange={handleChange} value={inputStates.logicValue} name="logicValue" >
        {Object.keys(logics).map((value, index) => {
          return <option value={logics[value]}>{ value}</option>
        })}
      </select>
      <input type='text' className='mr-2' onChange={handleChange} value={inputStates.inputValue} name="inputValue"/>
      <button className='mr-2' onClick={remove}>-</button>
      <button onClick={add}>+</button>

    </div>
  );
}


export default Filter;
