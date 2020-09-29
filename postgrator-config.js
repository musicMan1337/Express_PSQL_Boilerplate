const { NODE_ENV, TEST_DB_URL, DB_URL } = require('./src/config/envConfig');

module.exports = {
  migrationDirectory: __dirname + '/db/migrations',
  driver: 'pg',
  connectionString: NODE_ENV === 'test' ? TEST_DB_URL : DB_URL
};
