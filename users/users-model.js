const db = require("../data/dbConfig.js");

module.exports = {
    addNewUser,
    getAllUsers,
    findBy,
    getUserById
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
