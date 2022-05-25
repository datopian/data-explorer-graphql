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
export const EmployeeCompensationReport = Template.bind({})

EmployeeCompensationReport.args = {
  apiUri: 'https://gql.datopian.com/v1/',
  dataset: 'employee_compensation_report',
  schema: {
    fields: [
      {
        name: 'Calendar_Year',
        title: 'Calendar Year',
        type: 'number'
      },
      {
        name: 'Employment_Type',
        type: 'string'
      },
      {
        name: 'Job_Title',
        type: 'string'
      },
      {
        name: 'Division_Name',
        type: 'string'
      },
      {
        name: 'Regular_Pay',
        type: 'number'
      },
      {
        name: 'Overtime_Pay',
        type: 'number'
      },
      {
        name: 'Lump_Sum_Pay',
        type: 'number'
      },
      {
        name: 'Assignment_and_Incentive_Pay',
        type: 'number'
      },
      {
        name: 'Skill_Pay',
        type: 'number'
      },
      {
        name: 'Outside_Employer_Pay',
        type: 'number'
      },
      {
        name: 'Other_Pay',
        type: 'number'
      },
      {
        name: 'Retirement_Contribution',
        type: 'number'
      },
      {
        name: 'City_Paid_Deferred_Compensation',
        type: 'number'
      },
      {
        name: 'Health_Benefits_Average',
        type: 'number'
      },
      {
        name: 'Cash_in_Lieu_of_Medical_Benefits',
        type: 'number'
      },
      {
        name: 'Total',
        type: 'number'
      },
    ],
  },
}
