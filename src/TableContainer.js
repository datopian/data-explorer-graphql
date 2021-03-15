import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
const Query = require('graphql-query-builder');


function TableContainer({ dataset, schema, filter, total, offset , setOffset, setPage, page}) {
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map(item => item.name))
    .filter(Object.assign(filter, {limit: 100, offset}));


  //since order _by format is asc and desc but the graphql string
  //containd this format as 'asc' and 'desc' this will always give error
  //hence we check theis string and remove the quote

  let queryString = datasetQuery.toString()

  if (queryString.includes("asc") ) {
    queryString  = queryString.replace('"asc"','asc')
  } else {
    queryString  = queryString.replace('"desc"','desc')
  }

  const QUERY = gql`
    query Dataset {
      ${queryString}
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
      <div className='overflow-auto h-96 '>
        <Table
          data={data[`${dataset}`]}
          schema={schema}
          dataset={dataset}
          total={total}
          page={page}
        />
      </div>
      <div className="table-pagination">
      <button className="prev-button" onClick={()=>changePage(0)} disabled={page === 0}>Previous</button>
      {`   Page:  ${page + 1}   `}
      <button className="next-button" onClick={()=> changePage(1)} disabled={offset >= total + data.length}>Next</button>
      </div>
    </div>
  );
}

export default TableContainer;
