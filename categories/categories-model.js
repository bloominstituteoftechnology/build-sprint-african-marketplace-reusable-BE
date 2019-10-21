const db = require("../data/dbConfig.js");

module.exports = {
    addNewCategory,
    getAllCategories,
    findBy,
    getCategoryById,
    updateCategory,
    deleteCategory
};

function getAllCategories() {
    return db("category");
}

function getCategoryById(id) {
    return db("category")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("category").where(filter);
}

async function addNewCategory(category) {
    const [id] = await db("category").insert(category, "id");

    return getCategoryById(id);
}

async function updateCategory(id, changes) {
    await db("category")
        .where({ id })
        .update(changes)

    return getUserById(id);
}

function deleteCategory(id) {
    return db("category")
        .where({ id })
        .del();
}


