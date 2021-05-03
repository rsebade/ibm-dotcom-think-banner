import React from 'react'

import { DotcomShell } from '@ibmdotcom/think-banner'
import '@ibmdotcom/think-banner/dist/index.css'
import Content from './Content/Content'

const App = () => {
  return (
        <DotcomShell mastheadProps={{
              navigation: 'default',
              hasBanner: true
            }}>
            <Content />
        </DotcomShell>
      )
}

export default App
