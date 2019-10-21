const db = require("../data/dbConfig.js");

module.exports = {
    addFavorite,
    findBy,
    getFavoriteById,
    deleteFavorite,
    getUsersFavorites
};


function getFavoriteById(id) {
    return db("favorite")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("favorite").where(filter);
}

async function addFavorite(user_id, item_id) {
    await db("favorite").insert({ user_id, item_id })

    return getUsersFavorites(user_id);
}


function deleteFavorite(user_id, item_id) {
    return db("favorite")
        .where({ user_id, item_id })
        .del();
}

async function getUsersFavorites(user_id) {

    const favorites = await db("favorite").where("favorite.user_id", user_id)
        .join("item", "favorite.item_id", "item.id")
        .join("user", "favorite.user_id", "user.id")
        .select("favorite.item_id", "favorite.user_id", "item.name", "item.description", "item.photo_url", "item.zip_code", "item.price", "item.created_at", "user.email", "user.username", "user.about", "user.avatar_url");

    return favorites;
}

