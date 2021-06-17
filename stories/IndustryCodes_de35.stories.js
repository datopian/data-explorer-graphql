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
export const IndustryCodes = Template.bind({})

IndustryCodes.args = {
  apiUri: 'https://data-api.energidataservice.dk/v1/',
  dataset: 'industrycodes_de35',
  schema: {
    fields: [
      {
        title: 'Consumer type, DE35',
        description:
          'The consumer type is the Industry Code DE35 which is owned and maintained by Danish Energy, a non-commercial lobby organization for Danish energy compa-nies. The code is used by Danish energy companies. ',
        comment: '-',
        name: 'ConsumerType_DE35',
        type: 'string',
        unit: 'Coded',
        size: '3',
        example: '101',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'DE35, DA',
        description: 'Terms for Industry Codes DE35 in Danish',
        comment: '',
        name: 'DE35_DA',
        type: 'string',
        unit: 'Coded',
        size: '100',
        example: 'Restaurations- og hotelvirksomhed              ',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'DE35, UK',
        description: 'Terms for Industry Codes DE35 in English',
        comment: '',
        name: 'DE35_UK',
        type: 'string',
        unit: 'Coded',
        size: '100',
        example: 'Restaurants and hotels',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Consumer type, DE4',
        description:
          'Code for the overall categories of the Industry Codes DE35',
        comment: '',
        name: 'ConsumerType_DE4',
        type: 'string',
        unit: 'Coded',
        size: '3',
        example: '400',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'DE4, DA',
        description:
          'Terms for the overall categories of the Industry Codes DE35 in Danish',
        comment: '',
        name: 'DE4_DA',
        type: 'string',
        unit: 'Coded',
        size: '100',
        example:
          'Handel, service, offentlige foretagender m.v. samt andre forbrugere',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'DE4, UK',
        description:
          'Terms for the overall categories of the Industry Codes DE35 in English.',
        comment: '',
        name: 'DE4_UK',
        type: 'string',
        unit: 'Coded',
        size: '100',
        example: 'Trade, service, public enterprises etc. and other consumers',
        property_constraint: '',
        validation_rules: '',
      },
    ],
    primary_key: ['ConsumerType_DE35'],
  },
}
