import React, { useState } from 'react';
import Filter from './Filter';
import TableContainer from './TableContainer';


function App({ dataset, schema }) {
  const [filter, setFilter] = useState({});

  return (
    <div className='max-w-2xl mx-auto mt-20 '>
      <p data-testid="hidden-test"></p>
      <Filter dataset={dataset} schema={schema} filter={filter} setFilter={setFilter} />
      <TableContainer dataset={dataset} schema={schema} filter={filter} />
    </div>
  );
}

export default App;
