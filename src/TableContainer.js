import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
const Query = require('graphql-query-builder');


function TableContainer({ dataset, schema, filter, total, offset , setOffset}) {
  const [page, setPage ] = useState(0)
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map(item => item.name))
    .filter({
      where: filter,
      limit: 100,
      offset: offset // Default number of rows per page on preview
    });

  const QUERY = gql`
    query Dataset {
      ${datasetQuery}
    }
  `;
  
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const changePage = (increment)=>{
    const pageNum = increment? page + 1 : page -1
    setPage(pageNum)
    setOffset(pageNum * 100)
   
  }
  
  return (
    <div>
      Total preview rows: {data[`${dataset}`].length}
      <div>
      <button onClick={()=>changePage(0)} disabled={page === 0}>Previous</button>
      {` Page:  ${page + 1} `}
      <button onClick={()=> changePage(1)} disabled={offset >= total + data.length}>Next</button>
      </div>
      <div className='overflow-auto h-96 '>
        <Table 
          data={data[`${dataset}`]} 
          schema={schema} 
          dataset={dataset}
          total={total}
          page={page}
        />
      </div>
     
    </div>
  );
}

export default TableContainer;
