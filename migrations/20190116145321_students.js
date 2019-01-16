exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", t => {
    t.increments("id").primary();
    t.string("name", 255).notNullable();
    t.integer("cohort_id")
      .unsigned()
      .notNullable();
    t.foreign("cohort_id")
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
