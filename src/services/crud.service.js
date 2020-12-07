const CRUDService = {
  getAllData(db, table) {
    return db(table);
  },

  getAllBySearch(db, table, search) {
    return db(table).where({ ...search });
  },

  getBySearch(db, table, search) {
    return db(table)
      .where({ ...search })
      .first();
  },

  createEntry(db, table, newData) {
    return db(table).insert(newData, '*');
  },

  updateEntry(db, table, search, newData) {
    return db(table)
      .where({ ...search })
      .update(newData, '*');
  },

  deleteEntry(db, table, colName, colVal) {
    return db(table).where(colName, colVal).del('*');
  },
};

module.exports = CRUDService;
