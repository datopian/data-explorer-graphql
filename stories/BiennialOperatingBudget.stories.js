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
export const BiennialOperatingBudget = Template.bind({})

BiennialOperatingBudget.args = {
  apiUri: 'https://gql.datopian.com/v1/',
  dataset: 'biennial_operating_budget',
  schema: {
    fields: [
      {
        name: 'Ledger_Type',
        title: 'Ledger Type',
        type: 'string'
      },
      {
        name: 'Cost_Center_Type',
        title: 'Cost Center Type',
        type: 'string'
      },
      {
        name: 'Fund_ID',
        title: 'Fund ID',
        type: 'string'
      },
      {
        name: 'Fund_Name',
        title: 'Fund Name',
        type: 'string'
      },
      {
        name: 'Department_ID',
        title: 'Department ID',
        type: 'string'
      },
      {
        name: 'Department_Name',
        title: 'Department Name',
        type: 'string'
      },
      {
        name: 'Division_ID',
        title: 'Division ID',
        type: 'number'
      },
      {
        name: 'Division_Name',
        title: 'Division Name',
        type: 'string'
      },
      {
        name: 'Object',
        title: 'Object',
        type: 'number'
      },
      {
        name: 'Object_Description',
        title: 'Object Description',
        type: 'string'
      },
      {
        name: 'Revenue_Category_Code',
        title: 'Revenue Category Code',
        type: 'number'
      },
      {
        name: 'Category_code_description',
        title: 'Category code description',
        type: 'string'
      },
      {
        name: 'Fiscal_Year',
        title: 'Fiscal Year',
        type: 'number'
      },
      {
        name: 'July',
        type: 'number'
      },
      {
        name: 'August',
        type: 'number'
      },
      {
        name: 'September',
        type: 'number'
      },
      {
        name: 'October',
        type: 'number'
      },
      {
        name: 'November',
        type: 'number'
      },
      {
        name: 'December',
        type: 'number'
      },
      {
        name: 'January',
        type: 'number'
      },
      {
        name: 'February',
        type: 'number'
      },
      {
        name: 'March',
        type: 'number'
      },
      {
        name: 'April',
        type: 'number'
      },
      {
        name: 'May',
        type: 'number'
      },
      {
        name: 'June',
        type: 'number'
      },
      {
        name: 'Total',
        type: 'number'
      },
    ],
  },
}
