import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const root = document.getElementById('root');

const clientConfig = {
  uri: root.getAttribute('data-graphql'),
  cache: new InMemoryCache()
}
if(process.env.REACT_APP_HASURA_KEY){
  Object.assign(clientConfig, {
     headers: {
      'x-hasura-admin-secret': process.env.REACT_APP_HASURA_KEY
    }
  })
}

const client = new ApolloClient(clientConfig);


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App
        dataset={root.getAttribute('data-dataset')}
        schema={JSON.parse(root.getAttribute('data-schema'))}
      />
    </ApolloProvider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
