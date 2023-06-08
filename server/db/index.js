const { Pool } = require('pg')
 
const pool = new Pool({
  connectionString: "postgres://default:gXh7vYRPn1Cz@ep-royal-dust-927701-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})
 
module.exports = {
  query: (text, params) => pool.query(text, params),
}