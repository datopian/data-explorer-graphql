import React, { useState } from 'react'

export default function Download({query}) {
const [selected, setSelected] = useState('json')
const options = ['json', 'csv', 'xlsx', 'tsv', 'ods']
const {downloading, setDownloading } = useState('')

const handleChange =(event)=> {
  setSelected(event.target.value)
}

const downloadData = ()=>{
  setDownloading('Preparing Download')
  fetch(`http://localhost:8080/v1/download?format=${selected}`,{
    method: 'POST',
    headers: {'Content-Type' : 'application/json', 'Content-Disposition' : 'attachment', filename: `report.${selected}`}, 
    body: JSON.stringify({'query':query} )
}).then(response => response.blob())
.then(blob => {
            setDownloading('Downloading file')
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report.${selected}`;
            document.body.appendChild(a); 
            a.click();    
            a.remove(); 
            setDownloading('Done.')        
        }).catch(() => setDownloading('Error on download file'))

}

  return (
    <div className='p-5 flex justify-around'>
      Select format to Download: <select onChange={handleChange}>
        {options.map(item => (<option value={item}>{item}</option>))}
      </select>
    <button onClick={()=> downloadData()} className='bg-blue-600 p-1 text-white  rounded-md'> Download </button>
    </div>
  )
}