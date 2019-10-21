
exports.up = function (knex) {
    return knex.schema.createTable('favorite', favorite => {
        favorite.integer("item_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("item")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        favorite.integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("user")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        favorite.primary(["user_id", "item_id"]);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('favorite');
};
