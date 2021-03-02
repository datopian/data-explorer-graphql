import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Table from './Table';
const Query = require('graphql-query-builder');


function TableContainer({ dataset, schema, filter, total, offset , setOffset}) {
  const datasetQuery = new Query(dataset)
    .find(schema.fields.map(item => item.name))
    .filter({
      where: filter,
      limit: 100,
      offset: offset // Default number of rows per page on preview
    });

  console.log(datasetQuery)
  const QUERY = gql`
    query Dataset {
      ${datasetQuery}
    }
  `;

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      Total preview rows: {data[`${dataset}`].length}
      <div className='overflow-auto h-96 '>
        <Table 
          data={data[`${dataset}`]} 
          schema={schema} 
          dataset={dataset}
          total={total}
          offset={offset}
          setOffset={setOffset}
        />
      </div>
     
    </div>
  );
}

export default TableContainer;
