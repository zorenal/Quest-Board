const { Pool } = require('pg');

const PG_URI =
  'postgres://prhyrelt:3mutpx_zmscP0OeBKSmzuA8GSj53wdXg@mahmud.db.elephantsql.com/prhyrelt';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  pool,
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
