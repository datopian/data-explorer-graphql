import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
const Query = require('graphql-query-builder');


function TableContainer({ dataset, schema, filter }) {
  console.log(filter)
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map(item => item.name))
    .filter(filter)
    // .filter({
    //   where: filter,
    //   // order_by: "{HomePriceDKK: 'asc'}",
    //   limit: 100 // Default number of rows per page on preview
    // });

  console.log(datasetQuery.toString().replace('"asc"','asc'));
  const QUERY = gql`
    query Dataset {
      ${datasetQuery.toString().replace('"asc"','asc')}
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
