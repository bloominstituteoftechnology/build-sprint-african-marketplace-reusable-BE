const router = require("express").Router();

const Favorites = require("./favorites-model.js");

router.get("/:id", (req, res) => {
    const user_id = req.params.id;
    Favorites.getUsersFavorites(user_id)
        .then(favorites => {
            res.status(200).json(favorites)
        })
        .catch(err => {
            res.status(500).json({ err })
        })

})

router.post("/:id", (req, res) => {
    const user_id = req.params.id;
    const item_id = req.body.item_id;

    Favorites.addFavorite(user_id, item_id)
        .then(favorites => {
            res.status(200).json({ favorites })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

router.delete("/:id", (req, res) => {
    const user_id = req.params.id;
    const item_id = req.body.item_id;

    Favorites.deleteFavorite(user_id, item_id)
        .then(favorite => {
            res.status(200).json({ message: "Favorite successfully deleted." })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

module.exports = router;