# @ibmdotcom/think-banner

> This is a reusable banner to promote the Think event in IBM.com

[![NPM](https://img.shields.io/npm/v/@ibmdotcom/think-banner.svg)](https://www.npmjs.com/package/@ibmdotcom/think-banner) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @ibmdotcom/think-banner
```

## Running Locally
As recommended by create-react-library docs, it’s better to open two terminal windows (or tabs). In the first one, run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.
```
cd ibm-dotcom-think-banner && npm start
```
In the second terminal:
```
cd ibm-dotcom-think-banner/example && npm start
```

Also, create a `.env` file in the example directory and add the following to ensure the sass path compiles correctly
```
SASS_PATH=node_modules:src
```

## Usage

The banner should be added above either the DotcomShell or Masthead component from @carbon/ibmdotcom-react

```jsx
import React, { Component } from 'react'

import { Banner } from '@ibmdotcom/think-banner'
import { DotcomShell } from '@carbon/ibmdotcom-react'
import '@ibmdotcom/think-banner/dist/index.css'

class Example extends Component {
  render() {
    return (
      <>
        <Banner />
        <DotcomShell mastheadProps={{...mastheadProps}}   footerProps={{...footerProps}}>
          {children}
        </DotcomShell>
      </>
    )
  }
}
```


## License

MIT © [ibmdotcom-bot](https://github.com/ibmdotcom-bot)
