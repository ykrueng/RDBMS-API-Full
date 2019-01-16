exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", t => {
    t.increments("id").primary();
    t.string("name", 255)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
