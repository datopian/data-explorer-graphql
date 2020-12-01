import Filter from './Filter';
import Table from './Table';


function App({ dataset, schema }) {
  return (
    <div>
      <Filter dataset={dataset} schema={schema} />
      <Table dataset={dataset} schema={schema} filters={{}} />
    </div>
  );
}

export default App;
