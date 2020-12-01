import { useQuery, gql } from '@apollo/client';


function Table({ dataset, schema, filters }) {
  const QUERY = gql`
    query Dataset {
      ${dataset}(where: {ConnectedArea: {_eq: "DK1"}}, limit: 100) {
        ${schema.fields.map(item => item.name).join('\n')}
      }
    }
  `;

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      Total rows: {data[`${dataset}`].length}
      First row: {JSON.stringify(data[`${dataset}`][0])}
    </div>
  );
}

export default Table;
