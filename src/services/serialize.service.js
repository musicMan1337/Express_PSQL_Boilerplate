const xss = require('xss');

const {
  TABLE_NAMES: { USERS_TABLE },
} = require('../constants/db.constants');
const {
  USERS_CLIENT_RETURN,
} = require('../constants/db-returns.constants');

const SerializeService = {
  sanitizeObject(rawObject) {
    const keyVals = Object.entries(rawObject);

    keyVals.forEach(([key, value]) => (rawObject[key] = xss(value)));

    return rawObject;
  },

  sanitizeAll(rawArray) {
    return rawArray.map(this.serializeObject);
  },

  formatUser(rawUser) {
    const keyVals = Object.entries(USERS_CLIENT_RETURN);

    const user = {};
    keyVals.forEach(([key, value]) => (user[key] = rawUser[value]));

    return user;
  },

  formatAll(data, tableName) {
    switch (tableName) {
      case USERS_TABLE:
        return data.map(this.formatUser);

      default:
        return null;
    }
  },
};

module.exports = SerializeService;
