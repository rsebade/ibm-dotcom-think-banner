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

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from '@ibmdotcom/think-banner'
import '@ibmdotcom/think-banner/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [ibmdotcom-bot](https://github.com/ibmdotcom-bot)
