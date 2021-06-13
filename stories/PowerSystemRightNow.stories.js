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
export const PowerSystemRightNow = Template.bind({})

PowerSystemRightNow.args = {
  apiUri: 'https://data-api.energidataservice.dk/v1/',
  dataset: 'powersystemrightnow',
  schema: {
    fields: [
      {
        title: '1 minute UTC',
        description:
          'A date and time (interval), shown in _UTC time zone_, where the values are valid. 00:00:00 o\\u2019clock is the first 1 minute of a given day, interval 00:00:00 - 00:00:59, and 00:01:00 covers the second 1 minute period (interval) of the day and so forth. \r\n\r\nPlease note: The naming is based on the length of the interval of the finest grain of the resolution\r\n',
        comment:
          'Please note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mmZ\r\ne.g. 2017-07-14 08:05Z. \r\nThe Z will remind viewers that this is UTC.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:05.\r\nThat is without the \\u201cT\\u201d and the \\u201cZ\\u201d and the seconds. Excel will recognize it as date-time. The user must remember the convention about time zones.\r\n\r\nIn **download (JSON and XML)** the full format is used\r\nYYYY-MM-DDThh:mmZ\r\ne.g. 2017-07-14T08:05Z.\r\n',
        name: 'Minutes1UTC',
        type: 'datetime',
        unit: '',
        size: '20',
        example: '2017-07-14T08:05:31Z',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: '1 minutes DK',
        description:
          'A date and time (interval), shown in _Danish time zone_, where the values are valid. 00:00:00 o\\u2019clock is the first 1 minute of a given day, interval 00:00:00 - 00:00:59, and 00:01:00 covers the second 1 minute period (interval) of the day and so forth.',
        comment:
          'On one normal day there will be 24 * 60 = 1440 intervals.\r\n\r\nWhen daylight saving times shifts there will be either 1380 or 1500 intervals.\r\n\r\nPlease note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00. \r\nPlease note that is no time zone indicator, showning that this is local (Danish) time.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm:ss\r\ne.g. 2017-07-14 08:00:00.\r\nThat is without the \\u201cT\\u201d and the seconds. Excel will recognize it as date-time. The user must remember that this is local (Danish) time.\r\n\r\nIn **download (JSON and XML)** the  format used is\r\nYYYY-MM-DDThh:mm:ss\r\ne.g. 2017-07-14T08:00:00.\r\n',
        name: 'Minutes1DK',
        type: 'datetime',
        unit: '',
        size: '19',
        example: '2017-07-14T08:05:31',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'CO2 emission',
        description:
          'The estimated value for the emission in g/kWh for the relevant 5 minutes period.',
        comment: '-',
        name: 'CO2Emission',
        type: 'number',
        unit: 'g/kWh',
        size: '6.1',
        example: '301',
        format: '\\d{4}',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Production on plants greater than or equal to 100 MW',
        description:
          'Production on plants greater than or equal to 100 MW. Data based on energy measurements.',
        name: 'ProductionGe100MW',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Production on plants less than 100 MW',
        description: '-',
        name: 'ProductionLt100MW',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '100',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '>0',
      },
      {
        title: 'Solar power',
        description: 'Electricity production from Solar power',
        comment: '-',
        name: 'SolarPower',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '>=0',
      },
      {
        title: 'Offshore wind power',
        description: 'Electricity production from offshore wind power',
        name: 'OffshoreWindPower',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '>=0',
      },
      {
        title: 'Onshore wind power',
        description: 'Electricity production from onshore wind power',
        name: 'OnshoreWindPower',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '>=0',
      },
      {
        title: 'Exchange_Sum',
        description: 'Total exchange of electricity',
        comment: 'Positive values are import, negative are eksport',
        name: 'Exchange_Sum',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK1-DE',
        description: 'Exchange between DK1 and Germany',
        comment:
          'Positive values are import to DK1 from Germany, negative values are export',
        name: 'Exchange_DK1-DE',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK1-NL',
        description: 'Exchange between DK1 and the Nederlands',
        comment:
          'Positive values are import to DK1 from the Nederlands, negative values are export',
        name: 'Exchange_DK1-NL',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK1-NO',
        description: 'Exchange between DK1 and Norway',
        comment: 'Positive values are import, negative are export',
        name: 'Exchange_DK1-NO',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK1-SE',
        description: 'Exchange between DK1 and Sweden',
        comment:
          'Positive values are import to DK1 from Sweden, negative values are export',
        name: 'Exchange_DK1-SE',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK1-DK2',
        description: 'Exchange between DK1 (Jutland) and DK2 (Zealand)',
        comment:
          'Positive values are import to DK1 from DK2, negative values are export',
        name: 'Exchange_DK1-DK2',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK2-DE',
        description: 'Exchange between DK2 and Germany',
        comment:
          'Positive values are import to DK2 from Germany, negative values are export',
        name: 'Exchange_DK2-DE',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_DK2-SE',
        description: 'Exchange between DK2 and Sweden',
        comment:
          'Positive values are import to DK2 from Sweden, negative values are export',
        name: 'Exchange_DK2-SE',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Exchange_Bornholm-SE',
        description: 'Exchange between Bornholm and Sweden',
        comment:
          'Positive values are import to Bornholm from Sweden, negative values are export',
        name: 'Exchange_Bornholm-SE',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '234,55',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
    ],
    primary_key: ['Minutes1UTC'],
  },
}
