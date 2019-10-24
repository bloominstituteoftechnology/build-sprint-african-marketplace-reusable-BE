const db = require("../data/dbConfig.js");

const Users = require("../users/users-model");

module.exports = {
    addNewItem,
    getAllItems,
    findBy,
    getItemById,
    updateItem,
    deleteItem,
    getItemsCategories,
    search
};

function getAllItems() {
    return db("item").join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.city", "item.country", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

function getItemById(id) {
    return db("item")
        .where("item.id", id)
        .first()
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.city", "item.country", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

function findBy(filter) {
    return db("item").where(filter);
}

function search(value) {
    return db("item").where(db.raw('LOWER("name")'), "like", `%${value.toLowerCase()}%`)
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.city", "item.country", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

async function addNewItem(item) {
    const [id] = await db("item").insert(item, "id");

    return getItemById(id);
}

async function updateItem(id, changes) {
    await db("item")
        .where({ id })
        .update(changes)

    const item = await getItemById(id)

    return Users.getItemsByUser(item.user_id);
}

function deleteItem(id) {
    return db("item")
        .where({ id })
        .del();
}

function getItemsCategories(id) {
    return db("category").where({ "item_id": id });
}

