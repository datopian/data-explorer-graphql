import React, { useState } from 'react';
import Filter from './Filter';
import TableContainer from './TableContainer';


function App({ dataset, schema }) {
  const [filter, setFilter] = useState({});
  const [ total, setTotal ] = useState(0);
  const [offset, setOffset ] = useState(0)

  return (
    <div className='max-w-2xl mx-auto mt-20 '>
      <p data-testid="hidden-test"></p>
      <Filter dataset={dataset} schema={schema} filter={filter} setFilter={setFilter} total={total} setTotal={setTotal} offset={offset}/>
      <TableContainer dataset={dataset} schema={schema} filter={filter} total={total} offset={offset} setOffset={setOffset}/>
    </div>
  );
}

export default App;
