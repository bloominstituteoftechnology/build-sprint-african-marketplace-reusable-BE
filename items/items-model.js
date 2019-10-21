const db = require("../data/dbConfig.js");

module.exports = {
    addNewItem,
    getAllItems,
    findBy,
    getItemById,
    updateItem,
    deleteItem,
    getItemsCategories
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
    console.log("filter", filter)
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

function getItemsCategories(id) {
    return db("category").where({ "item_id": id });
}
