const db = require("../data/dbConfig.js");

module.exports = {
    addNewItem,
    getAllItems,
    findBy,
    getItemById,
    updateItem,
    deleteItem
};

function getAllItems() {
    return db("item");
}

function getItemById(id) {
    return db("item")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("item").where(filter);
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
