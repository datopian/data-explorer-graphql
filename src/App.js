import { useQuery, gql } from '@apollo/client';

const TOTAL_ROWS = gql`
  query MyQuery {
    transmissionlines_aggregate {
      aggregate {
        count
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(TOTAL_ROWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>Total rows: {data.transmissionlines_aggregate.aggregate.count}</div>
  );
}

export default App;
