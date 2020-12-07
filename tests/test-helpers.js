const {
  TABLE_NAMES: { USERS },
} = require('../src/constants/db.constants');

/*
|--------------------------------------------------------------------------
| Seed Data
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Safe Client-side submission data
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Malicious Client-side submission data
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Dev-Only Client-side submission data
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Expected Query Data
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Helper functions
|--------------------------------------------------------------------------
*/
const getUserPassword = (userName) => {
  return USER_PASSWORDS_JWT[userName].password;
};

const getAuthHeaders = async (app, user_name) => {
  const { password } = USER_PASSWORDS_JWT[user_name];
  const { body } = await supertest(app)
    .post('/api/users/login')
    .send({ user_name, password });

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${body.authToken}`,
  };
};

const invalidHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer invalidToken`,
};

const getSeedData = () => ({});

const getClientSubmissions = () => ({
  safeUser,
});

const getMaliciousSubmissions = () => ({
  maliciousUser,
});

const getDevOnlySubmissions = () => ({});

const getExpectedQueryData = () => ({
  GET_REQUESTS,
  DELETE_REQUESTS,
});

const cleanTables = (db) => {
  return db.raw(`TRUNCATE users RESTART IDENTITY CASCADE;`);
};

const seedUsers = (db) => db(USERS).insert(users_seed);

const seedTable = (db, table, data) => db(table).insert(data);

const seedAllTables = async (db) => {
  await db(USERS).insert(users_seed);
};

const getFromDB = {};

module.exports = {
  getAuthHeaders,
  invalidHeader,
  getSeedData,
  getClientSubmissions,
  getMaliciousSubmissions,
  getDevOnlySubmissions,
  getExpectedQueryData,

  cleanTables,

  seedTable,
  seedUsers,
  seedAllTables,
  getFromDB,
};
