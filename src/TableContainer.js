import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
const Query = require('graphql-query-builder');


function TableContainer({ dataset, schema, filter }) {
  console.log(filter)
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map(item => item.name))
    .filter(filter);


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

  return (
    <div>
      Total preview rows: {data[`${dataset}`].length}
      <div className='overflow-auto h-96 '>
         <Table data={data[`${dataset}`]} schema={schema} />
      </div>
     
    </div>
  );
}

export default TableContainer;
