const db = require("../data/dbConfig");

module.exports = {
  get: function(id) {
    let query = db("students")
    .select("students.id", "students.name", "cohorts.name as cohort")
    .join("cohorts", "students.cohort_id", "cohorts.id");

    if (id) {
      return query.where("students.id", id).first();
    }

    return query;
  },

  insert: function (student) {
    return db("students").insert(student);
  },

  update: function(id, student) {
    return db("students")
      .where("id", id)
      .update(student);
  },

  remove: function(id) {
    return db("students")
      .where("id", id)
      .del();
  }
};