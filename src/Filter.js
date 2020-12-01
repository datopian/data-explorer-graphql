import { useQuery, gql } from '@apollo/client';


function Filter({ dataset, schema }) {
  const QUERY = gql`
    query Dataset {
      ${dataset}_aggregate(where: {ConnectedArea: {_eq: "DK1"}}) {
        aggregate {
          count
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      Total rows: {data[`${dataset}_aggregate`].aggregate.count}
    </div>
  );
}

export default Filter;
