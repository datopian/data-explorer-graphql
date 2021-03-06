import React from 'react'
import Table from '../src/Table'
import root from '../src/App'

export default {
  title: 'Component / Table',
  component: Table,
}

const Template = (args) => <Table {...args} />

export const Load = Template.bind({})

Load.args = {
  schema: {
    fields: [
      {
        title: '',
        name: 'name',
        type: 'string',
        description: '',
        format: '',
      },
      {
        title: '',
        name: 'age',
        type: 'integer',
        description: '',
        format: '',
      },
      {
        title: '',
        name: 'address',
        type: 'string',
        description: '',
        format: '',
      },
    ],
  },
  data: [
    { name: 'Eathan Pritchard', age: 25, address: '1201 Tompkins Dr Madison' },
    { name: 'Zidan Berg', age: 22, address: '1309 Tompkins Dr Madison' },
    { name: 'Raisa Kinney', age: 32, address: '1497 Tompkins Dr Madison' },
    { name: 'Cara Woodley', age: 30, address: '1197  Buckeye Rd  Madison' },
    { name: 'Komal Robbins', age: 42, address: '1192  Buckeye Rd  Madison' },
    { name: 'Deacon Childs', age: 28, address: '1027 Tompkins Dr Madison' },
    { name: 'Ayse Shaw', age: 21, address: '1233 Buckeye Rd Madison' },
  ],
}
