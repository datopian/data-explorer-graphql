import React, { useEffect } from 'react';
import DateTime from './DateTime';


function SelectFilter({setInputStates, inputState, inputStates, index, fields, logics, setAddRules}){

  const handleChange = function(e){

    const name = e.target.name;
    const value = e.target.value;

    setInputStates((prevState) =>{
      const newdata = prevState.slice();
      newdata[index][name][0] = value;
      if (name === "columnName" && (schemaType(value) !== "datetime") && (schemaType(value) !== "date")) {
         newdata[index]['logicValue'][0] = '_eq'
      }
      return newdata;
    });
  }

  const getFields = function(index) {

    let filterFields = null;
    
    if (index === 0) {
      filterFields = fields.filter(val => {
      return (val.type === "datetime") || (val.type === "date")
      })
    } else {
      filterFields = fields.filter(val => {
      return (val.type !== "datetime") && (val.type !== "date")
      })
    }

    return filterFields;
    
  }

  const setData = function(value) {
    setInputStates((prevState) =>{
      const newdata = prevState.slice();
      newdata[index]["columnName"][0] = value;
      if ((schemaType(value) !== "datetime") && (schemaType(value) !== "date")) {
         newdata[index]['logicValue'][0] = '_eq'
      }
      return newdata;
    });
  }

  useEffect(()=> {
    const value = getFields(index)[0].name;
    setData(value)

  },[])

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
    if (inputStates.slice(1).length === 1) {
      setInputStates((prevState) => {
        const newState = prevState.slice();
        newState.splice(index,1);
        return newState;
      });

      setAddRules(false)
    } else {
      
      setInputStates((prevState) => {
        const newState = prevState.slice();
        newState.splice(index,1);
        return newState;
      });
    }
    
  }

  const schemaType = function(columnName) {
    
    if (columnName) {
      const dtype = fields.filter(val => val.name === columnName)[0]
      return dtype["type"]
    }
    
  }

  return (
    <div className='mb-2' data-testid='field-container'>
      <select className='mr-2 border' onChange={handleChange} value={inputState.columnName[0]} name="columnName" data-testid='field' >
        {getFields(index).map((value, index) => {
          
         return <option value={value.name} key={index}>{ value.title}</option>
          
        })}
      </select>
      {
        ((schemaType(inputState.columnName[0]) === "datetime") || (schemaType(inputState.columnName[0]) === "date")) ? "" :
          <select className='mr-2' onChange={handleChange} value={inputState.logicValue[0]} name="logicValue" data-testid='logic'>
          {Object.keys(logics).map((value, index) => {
            return <option value={logics[value]} key={index}>{ value}</option>
          })}
        </select>
      }
      
      {
        (schemaType(inputState.columnName[0]) === "datetime") || (schemaType(inputState.columnName[0]) === "date") ?
          <DateTime columnName={inputState.columnName[0]} setInputStates={setInputStates} index={index} fields={fields} /> :
          <input type='text' className='mr-2 border' onChange={handleChange} value={inputState.inputValue} name="inputValue" data-testid='field-value'/>
      }
      {
        index === 0 ? "": <>
          <button className='mr-2' onClick={remove} data-testid='remove'>-</button>
          <button onClick={add} data-testid='add'>+</button>
        </>
      }
      

    </div>
  );
}

export default SelectFilter;
