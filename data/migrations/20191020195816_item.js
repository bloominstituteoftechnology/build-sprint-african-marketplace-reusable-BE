
exports.up = function (knex) {
    return knex.schema.createTable('item', item => {
        item.increments();

        item.string('name', 128)
            .notNullable()

        item.string('description', 1500)

        item.string('photo_url', 3000)

        item.string('city', 50)
            .notNullable()

        item.string('country', 50)
            .notNullable()

        item.float('price')
            .notNullable()

        item.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());

        item.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('item');
};
