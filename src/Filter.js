import React, { useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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


  const [inputStates, setInputStates] = useState([{columnName:'', logicValue: '_eq', inputValue: ''}])
  const orderColumnRef = useRef()
  const orderByRef = useRef()

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  setTotal(data[`${dataset}_aggregate`].aggregate.count)

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

  const resetFilter = function() {
    // reset the inputstates to one if multiple exist
    if (inputStates.length > 1 ) {
      setInputStates([{columnName:'', logicValue: '_eq', inputValue: ''}]);
    }
    setOffset(0)
    setPage(0)
    setFilter({})
  }

  return (
    <>
    <div data-testid='agg'>
      Total rows: {total}
    </div>
    <form>
      <div className='mb-2 border pl-2' data-testid='all-fields'>
        {inputStates.map((value, index) => {

          return <SelectFilter setInputStates={setInputStates} fields={schema.fields} logics={logics}
                             inputStates={value} index={index} key={index}/>
        })}
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





function SelectFilter({setInputStates, inputStates, index, fields, logics}){

  const [startDate, setStartDate] = useState(new Date());
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

  const handleDate = function(fieldType,date) {
    const dDate = date.toISOString().slice(0,10)
    const hour = date.getHours()
    const minute = date.getMinutes().toString()
    let timeString = null;

    if (fieldType === "HourDK") {
      timeString = `${dDate} ${hour}:${minute}`
    } else {
      timeString = `${dDate} ${hour}:${minute}${ minute.length > 1? 'Z' : '0Z'}`
    }
    
    setStartDate(date)
    setInputStates((prevState) =>{
      const newdata = prevState.slice();
      newdata[index]["inputValue"] = timeString;
      return newdata;
    });
  }

  return (
    <div className='mb-2' data-testid='field-container'>
      <select className='mr-2 border' onChange={handleChange} value={inputStates.columnName} name="columnName" data-testid='field'>
        <option >--select a field--</option>
        {fields.map((value, index) => {
          return <option value={value.name} key={index}>{ value.title}</option>
        })}
      </select>
      <select className='mr-2' onChange={handleChange} value={inputStates.logicValue} name="logicValue" data-testid='logic'>
        {Object.keys(logics).map((value, index) => {
          return <option value={logics[value]} key={index}>{ value}</option>
        })}
      </select>
      {
        (inputStates.columnName === "HourDK") || (inputStates.columnName === "HourUTC") ?
          <DatePicker selected={startDate} onChange={date => handleDate(inputStates.columnName,date)} showTimeSelect dateFormat="yyyy-MM-dd HH:mm" timeFormat="HH:mm"/> :
          <input type='text' className='mr-2 border' onChange={handleChange} value={inputStates.inputValue} name="inputValue" data-testid='field-value'/>
      }
      <button className='mr-2' onClick={remove} data-testid='remove'>-</button>
      <button onClick={add} data-testid='add'>+</button>

    </div>
  );
}

function OrderBy({orderColumnRef, orderByRef, fields}) {

  return (
    <div  className='mb-2 border pl-2 pb-2 pt-2'>
      <div>Order by</div>
      <div>
        <select ref={orderColumnRef} className='mr-2 border' data-testid="data-ord">
          {fields.map((value, index) => {
            return <option value={value.name} key={index}>{ value.title}</option>
          })}
        </select>
        <select className='bg-white border-2' ref={orderByRef} data-testid="ord-type">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}


export default Filter;
