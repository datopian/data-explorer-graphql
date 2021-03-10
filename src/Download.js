import React, { useState } from 'react'

export default function Download() {
const [selected, setSelected] = useState('')
const options = ['json', 'csv', 'xlsx', 'tsv', 'ods']

const handleChange =(event)=> {
  setSelected(event.target.value)
}


  return (
    <div className='p-5 flex justify-around'>
      Select format to Download: <select onChange={handleChange}>
        {options.map(item => (<option value={item}>{item}</option>))}
      </select>
    <button className='bg-blue-600 p-1 text-white  rounded-md'> Download </button>
    </div>
  )
}