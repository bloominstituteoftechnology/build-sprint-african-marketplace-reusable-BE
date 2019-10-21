const db = require("../data/dbConfig.js");

module.exports = {
    addNewUser,
    getAllUsers,
    findBy,
    getUserById,
    updateUser,
    deleteUser,
    getItemsByUser
};

function getAllUsers() {
    return db("user");
}

function getUserById(id) {
    return db("user")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("user").where(filter);
}

async function addNewUser(user) {
    const [id] = await db("user").insert(user, "id");

    return getUserById(id);
}

async function updateUser(id, changes) {
    await db("user")
        .where({ id })
        .update(changes)

    return getUserById(id);
}

function deleteUser(id) {
    return db("user")
        .where({ id })
        .del();
}

function getItemsByUser(id) {
    return db("item").where({ "user_id": id });
}

