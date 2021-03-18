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
export const ElspotPrices = Template.bind({})

ElspotPrices.args = {
  apiUri: 'https://data-api.energidataservice.dk/v1/',
  dataset: 'elspotprices',
  schema: {
    fields: [
      {
        title: 'Hour UTC',
        description:
          'A date and time (interval), shown in _UTC time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day interval  00:00 - 00:59 and 01:00 covers the second hour (interval) of the day and so forth. Please note: The naming is based on the length of the interval of the finest grain of the resolution.',
        comment:
          'Please note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mmZ\r\ne.g. 2017-07-14 08:00Z. \r\nThe Z will remind viewers that this is UTC.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the \\u201cZ\\u201d and the seconds. Excel will recognize it as date-time. The user must remember the convention about time zones.\r\n\r\nIn **download (JSON and XML)** the full format is used\r\nYYYY-MM-DDThh:mmZ\r\ne.g. 2017-07-14T08:00Z.\r\n',
        name: 'HourUTC',
        type: 'datetime',
        unit: '',
        size: '17',
        example: '2017-07-14T08:00Z',
        format: '',
        property_constraint: '',
        validation_rules: 'Always full hours, i.e. minutes are 00',
      },
      {
        title: 'Hour DK',
        description:
          'A date and time (interval), shown in _Danish time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day, interval 00:00 - 00:59, and 01:00 covers the second hour period (interval) of the day and so forth. ',
        comment:
          'On one normal day there will be 24 intervals.\r\n\r\nWhen daylight saving times shifts there will be either 23 or 25 intervals.\r\n\r\nPlease note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00. \r\nPlease note that is no time zone indicator, showning that this is local (Danish) time.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the seconds. Excel will recognize it as date-time. The user must remember that this is local (Danish) time.\r\n\r\nIn **download (JSON and XML)** the  format used is\r\nYYYY-MM-DDThh:mm\r\ne.g. 2017-07-14T08:00.',
        name: 'HourDK',
        type: 'datetime',
        unit: '',
        size: '17',
        example: '2017-07-14T08:00',
        format: '',
        property_constraint: '',
        validation_rules: 'Always full hours, i.e. minutes are 00',
      },
      {
        title: 'Price area',
        description:
          'Same as bidding zone. Denmark is divided in two price areas, or bidding zones, divided by the Great Belt. DK1 is west of the Great Belt and DK2 is east of the Great Belt. \n\n\n',
        comment:
          'If price area is \\u201cDK\\u201d, the data covers all Denmark.',
        name: 'PriceArea',
        type: 'string',
        unit: '',
        size: '3',
        example: 'DK1',
        format: 'DK1 | DK2',
        property_constraint: '',
        validation_rules: 'DK1 or DK2',
      },
      {
        title: 'Spot price (DKK)',
        description: 'Day ahead Spot Price in the price area',
        comment:
          'The day-ahead prices indicate the balance between supply and demand.',
        name: 'SpotPriceDKK',
        type: 'number',
        unit: 'DKK per MWh',
        size: '9.2',
        example: '543,45',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Spot price (EUR)',
        description: 'Day ahead Spot Price in the price area',
        comment:
          'The day-ahead prices indicate the balance between supply and demand.',
        name: 'SpotPriceEUR',
        type: 'number',
        unit: 'EUR per MWh',
        size: '9.2',
        example: '543,45',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
    ],
    primary_key: ['HourUTC', 'PriceArea'],
  },
}
