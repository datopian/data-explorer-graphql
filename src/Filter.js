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


  const [inputStates, setInputStates] = useState([{columnName:[''], logicValue: [], inputValue: []}])
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
      // whereVariables[value.columnName] = { [value.logicValue] : value.inputValue}
      whereVariables[value.columnName[0]] = {}
      value.logicValue.forEach((val, index)=> {
        const logic = value.logicValue[index];
        const input = value.inputValue[index];
        whereVariables[value.columnName][logic] = input;
      })
    });
    console.log(whereVariables)
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
      setInputStates([{columnName:'', logicValue: ['_eq'], inputValue: ['']}]);
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
      newdata[index][name][0] = value;
      if (name === "columnName" && (schemaType(value) != "datetime") && (schemaType(value) != "date")) {
         newdata[index]['logicValue'][0] = '_eq'
      }
      return newdata;
    });
  }

  const add = function(e){
    e.preventDefault();

    setInputStates((prevState) => {
      const newState = prevState.slice();
      newState.push({columnName:[''], logicValue: [], inputValue: []})
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

  const schemaType = function(columnName) {
    
    if (columnName) {
      const dtype = fields.filter(val => val.name === columnName)[0]
      return dtype["type"]
    }
    
  }

  return (
    <div className='mb-2' data-testid='field-container'>
      <select className='mr-2 border' onChange={handleChange} value={inputStates.columnName[0]} name="columnName" data-testid='field'>
        <option >--select a field--</option>
        {fields.map((value, index) => {
          return <option value={value.name} key={index}>{ value.title}</option>
        })}
      </select>
      {
        ((schemaType(inputStates.columnName[0]) === "datetime") || (schemaType(inputStates.columnName[0]) === "date")) ? "" :
          <select className='mr-2' onChange={handleChange} value={inputStates.logicValue[0]} name="logicValue" data-testid='logic'>
          {Object.keys(logics).map((value, index) => {
            return <option value={logics[value]} key={index}>{ value}</option>
          })}
        </select>
      }
      
      {
        (schemaType(inputStates.columnName[0]) === "datetime") || (schemaType(inputStates.columnName[0]) === "date") ?
          <DateTime columnName={inputStates.columnName[0]} setInputStates={setInputStates} index={index} fields={fields} /> :
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

function DateTime({columnName, setInputStates, index, fields}) {
  const [startDate1, setStartDate1] = useState();
  const [startDate2, setStartDate2] = useState();

  const handleDate = function(columnName,date, type) {
    if (date) {
      const dDate = date.toISOString().slice(0,10)
      const hour = date.getHours()
      const minute = date.getMinutes().toString()
      let timeString = null;

      console.log(fields, columnName)
      const examples = fields.filter(val => val.name === columnName)[0]["example"]
      const isISO= examples.includes('Z')
    
      if (isISO) {
        timeString = `${dDate} ${hour}:${minute}${ minute.length > 1? 'Z' : '0Z'}`
      } else {
        timeString = `${dDate} ${hour}:${minute}`
      }
      
      if (type === "type1") {

        setStartDate1(date)
        setInputStates((prevState) =>{
          const newdata = prevState.slice();
          newdata[index]['logicValue'][0] = "_gte"
          newdata[index]["inputValue"][0] = timeString;
          return newdata;
      });
      } else {
        setStartDate2(date)
        setInputStates((prevState) =>{
          const newdata = prevState.slice();
          newdata[index]['logicValue'][1] = "_lt"
          newdata[index]["inputValue"][1] = timeString;
          return newdata;
        });
      }
    } else {

      if (type === "type1") {

        setStartDate1(date)
      } else {
        setStartDate2(date)
      }

    }
    
  }

  return (
    <>
      <DatePicker selected={startDate1} onChange={date => handleDate(columnName,date, "type1")} showTimeSelect dateFormat="yyyy-MM-dd HH:mm" timeFormat="HH:mm"/>
      <span className="mr-2">--></span>
      <DatePicker selected={startDate2} onChange={date => handleDate(columnName,date, "type2")} showTimeSelect dateFormat="yyyy-MM-dd HH:mm" timeFormat="HH:mm"/>

    </>
  );
}


export default Filter;
