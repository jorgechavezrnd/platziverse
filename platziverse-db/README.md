# platziverse-db

## Usage

``` js
const setupDatabase = require('platziverse-db')

setupDatabase(config).then(db => {
  const { Agent, Metric } = db
}).catch(err => console.error(err))
```

## Commands for run scripts
- `npm run lint`
- `npm run lint -- --fix`

## Commands for test module
- `node`
- `const setupDatabase = require('./')`
- `setupDatabase()`

## Commands for install dependencies
- `npm i --save-dev standard`
- `npm i sequelize pg pg-hstore --save`
