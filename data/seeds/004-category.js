
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { type: "animal products", item_id: 3 },
        { type: "poultry", item_id: 2 },
        { type: "animal products", item_id: 1 }
      ]);
    });
};
