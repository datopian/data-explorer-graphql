import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const root = document.getElementById('root')
const apiUri = root.getAttribute('data-api')

const client = new ApolloClient({
  uri: apiUri + 'graphql',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App
        dataset={root.getAttribute('data-dataset')}
        schema={JSON.parse(root.getAttribute('data-schema'))}
        apiUri={apiUri}
      />
    </ApolloProvider>
  </React.StrictMode>,
  root
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
