import React from 'react'
import App from '../src/App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://gql.datopian.com/v1/graphql',
  cache: new InMemoryCache(),
})

export default {
  title: 'Templates',
  component: App,
}

const Template = (args) => (
  <ApolloProvider client={client}>
    <App {...args} />
  </ApolloProvider>
)
export const FeesAndRates = Template.bind({})

FeesAndRates.args = {
  apiUri: 'https://gql.datopian.com/v1/',
  dataset: 'fees_and_rates_2021_2022',
  schema: {
    fields: [
      {
        name: 'Department',
        type: 'string'
      },
      {
        name: 'Division',
        type: 'string'
      },
      {
        name: 'Category',
        type: 'string'
      },
      {
        name: 'Activity',
        type: 'string'
      },
      {
        name: 'Keywords',
        type: 'string'
      },
      {
        name: 'Fee_Name_Description',
        type: 'string'
      },
      {
        name: 'FEE',
        type: 'number'
      },
      {
        name: 'Fee_Other',
        type: 'string'
      },
      {
        name: 'Unit',
        type: 'string'
      },
      {
        name: 'Additional_Fee',
        type: 'string'
      },
      {
        name: 'Additional_Fee_Unit',
        type: 'string'
      },
      {
        name: 'Deposit',
        type: 'string'
      },
      {
        name: 'Rate_Tier',
        type: 'string'
      },
      {
        name: 'Comments',
        type: 'string'
      },
      {
        name: 'External_Link_s_',
        type: 'string'
      },
      {
        name: 'Notes',
        type: 'string'
      },
    ],
  },
}
