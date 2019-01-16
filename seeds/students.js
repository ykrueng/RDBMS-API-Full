exports.seed = function(knex, Promise) {
  return knex('students').truncate()
    .then(function () {
      return knex('students').insert([
        {name: 'Frodo Baggins', cohort_id: 1},
        {name: 'Samwise Gamgee', cohort_id: 1},
        {name: 'Pippin Took', cohort_id: 2},
        {name: 'Merry Brandybuck', cohort_id: 3},
        {name: 'Strider', cohort_id: 3},
        {name: 'Legolas', cohort_id: 4},
      ]);
    });
};
