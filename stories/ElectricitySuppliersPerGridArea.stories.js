import React from 'react'
import App from '../src/App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://data-api.energidataservice.dk/v1/graphql',
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
export const ElectricitySuppliersPerGridArea = Template.bind({})

ElectricitySuppliersPerGridArea.args = {
  apiUri: 'https://data-api.energidataservice.dk/v1/',
  dataset: 'electricitysupplierspergridarea',
  schema: {
    fields: [
      {
        title: 'Month',
        description: 'Year and month',
        comment: '-',
        name: 'Month',
        type: 'date',
        unit: 'Months',
        size: '7',
        example: '2017-01',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Grid company',
        description:
          'Grid company number according to Danish Energy. Dan-ish Energy is a non-commercial lobby organization for Danish energy companies. Read more about Danish Ener-gy here: https://www.danskenergi.dk/about-danish-energy',
        comment: '-',
        name: 'GridCompany',
        type: 'string',
        unit: 'text',
        size: '3',
        example: '031',
        format: '',
        property_constraint: '',
        validation_rules: '>000 and <= 999',
      },
      {
        title: 'Active electricity suppliers',
        description: 'Number of active electricity suppliers per grid area. ',
        comment:
          'Since an electricity supplier can appear in more than one grid area it is not possible to make a sum of this column ("Active electricity suppliers") to get the total number of active electricity suppliers nationally. Instead the Grid company called "DK" shows the total number of active electricity suppliers nationally. ',
        name: 'ActiveSupplierPerGridArea',
        type: 'integer',
        unit: 'Number',
        size: '4',
        example: '46',
        format: '/d{4}',
        property_constraint: '',
        validation_rules: '',
      },
    ],
    primary_key: ['Month', 'GridCompany'],
  },
}
