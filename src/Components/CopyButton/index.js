import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function CopyButton({ query }) {
  return (
    <CopyToClipboard text={query}>
      <button>Copy query</button>
    </CopyToClipboard>
  )
}
