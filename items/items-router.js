const router = require("express").Router();

const Items = require("./items-model.js");
const Favorites = require("../favorites/favorites-model.js")


// ---------------------- /api/items ---------------------- //

router.get("/", async (req, res) => {
    try {
        const items = await Items.getAllItems();

        Promise.all(items.map(async item => {
            const categories = await Items.getItemsCategories(item.id);
            const favorited = await Favorites.getFavoritesCount(item.id)
            item.favorited = favorited.count;
            item.categories = categories;
            return item;
        })).then(items => {
            res.status(200).json(items);
        })

    } catch (error) {
        res.status(500).json({ error });
    }
});

// ------------------- GET Item By Id /api/items/:id ------------------- //

router.get("/:id", verifyItemExists, async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Items.getItemById(id);
        const favorited = await Favorites.getFavoritesCount(id);
        item.favorited = favorited.count;
        item.categories = await Items.getItemsCategories(id);
        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ error });
    }
});


// ------------- GET Search for an Item by Like Name /api/items/search/:name ------------- //

router.get("/search/:name", (req, res) => {
    const name = req.params.name;
    Items.search(name)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            res.status(500).json({ err })
        });
})

// ---------------------- Post New Item /api/items ---------------------- //

router.post("/", (req, res) => {
    req.body.country = req.body.country.toUpperCase();

    Items.addNewItem(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

// ---------------------- PUT New Item by ID /api/items ---------------------- //

router.put("/:id", verifyItemExists, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (req.body.country) return req.body.country = req.body.country.toUpperCase();

    Items.updateItem(id, changes)
        .then(updatedItem => {
            res.status(201).json(updatedItem);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}
);

// ---------------------- DELETE New Item by ID /api/items ------------------- //

router.delete("/:id", verifyItemExists, (req, res) => {
    const id = req.params.id;

    Items.deleteItem(id)
        .then(deletedItem => {
            res.status(200).json({ message: "Item successfully deleted from database." });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyItemExists(req, res, next) {
    const id = req.params.id;

    Items.getItemById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "Item Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}


module.exports = router;