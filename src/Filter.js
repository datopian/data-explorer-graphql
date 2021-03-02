import React from 'react'
import { useQuery, gql } from '@apollo/client';
const Query = require('graphql-query-builder');


function Filter({ dataset, schema, filter, setFilter, total, setTotal }) {

  const getTotalRows = new Query(`${dataset}_aggregate`)
    .find(new Query('aggregate').find('count'));

  // getTotalRows.filter({where: {ConnectedArea: {_eq: 'DK1'}}});
  const QUERY = gql`
    query Dataset {
      ${getTotalRows}
    }
  `;

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
 
  setTotal(data[`${dataset}_aggregate`].aggregate.count)
  
  return (
    <div>
      Total rows: {total}
    </div>
  );
}

export default Filter;
