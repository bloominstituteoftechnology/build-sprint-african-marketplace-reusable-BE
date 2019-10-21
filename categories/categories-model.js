const db = require("../data/dbConfig.js");

module.exports = {
    addNewCategory,
    getAllCategoriesWithItems,
    findBy,
    getCategoryById,
    deleteCategory
};

async function getAllCategoriesWithItems() {
    const list = await db("category").distinct("category.type");

    return list;
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

function deleteCategory(id) {
    return db("category")
        .where({ id })
        .del();
}


