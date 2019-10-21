
exports.up = function (knex) {
    return knex.schema.createTable('category', category => {
        category.increments();

        category.string('type', 50)
            .notNullable()

        category.integer('item_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('item')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('category');
};
