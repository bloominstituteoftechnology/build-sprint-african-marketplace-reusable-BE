const db = require("../data/dbConfig.js");

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
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.zip_code", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

function getItemById(id) {
    return db("item")
        .where("item.id", id)
        .first()
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.zip_code", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

function findBy(filter) {
    return db("item").where(filter);
}

function search(value) {
    return db("item").where("name", "like", `%${value}%`)
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.photo_url", "item.zip_code", "item.price", "item.created_at", "item.user_id", "user.email", "user.username", "user.about", "user.avatar_url");
}

async function addNewItem(item) {
    const [id] = await db("item").insert(item, "id");

    return getItemById(id);
}

async function updateItem(id, changes) {
    await db("item")
        .where({ id })
        .update(changes)

    return getItemById(id);
}

function deleteItem(id) {
    return db("item")
        .where({ id })
        .del();
}

function getItemsCategories(id) {
    return db("category").where({ "item_id": id });
}

