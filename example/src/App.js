import React from 'react'

import { Banner } from '@ibmdotcom/think-banner'
import { DotcomShell } from '@carbon/ibmdotcom-react'
import '@ibmdotcom/think-banner/dist/index.css'
import Content from './Content/Content'

const App = () => {
  return (
      <>
      <Banner />
        <DotcomShell mastheadProps={{
          navigation: "default"
        }}>
            <Content />
        </DotcomShell>
      </>
      )
}

export default App
