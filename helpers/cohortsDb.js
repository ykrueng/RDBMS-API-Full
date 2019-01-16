const db = require("../data/dbConfig");

module.exports = {
  get: function(id) {
    let query = db("cohorts");

    if (id) {
      return query.where("id", id).first();
    }

    return query;
  },

  insert: function (cohort) {
    return db("cohorts").insert(cohort);
  },

  update: function(id, cohort) {
    return db("cohorts")
      .where("id", id)
      .update(cohort);
  },

  remove: function(id) {
    return db("cohorts")
      .where("id", id)
      .del();
  }
};