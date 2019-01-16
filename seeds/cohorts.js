exports.seed = function(knex, Promise) {
  return knex("cohorts")
    .truncate()
    .then(function() {
      return knex("cohorts").insert([
        { name: "Web15" },
        { name: "Web16" },
        { name: "DS1" },
        { name: "Web17" }
      ]);
    });
};
