const router = require("express").Router();

const Users = require("./users-model.js");
const Items = require("../items/items-model.js");
const Favorites = require("../favorites/favorites-model.js");


// ---------------------- /api/users ---------------------- //

router.get("/", (req, res) => {
    Users.getAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ---------------------- GET User By Id ---------------------- //

router.get("/:id", verifyUserId, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.getUserById(id);
        user.items = await Users.getItemsByUser(id);
        user.favorites = await Favorites.getUsersFavorites(id);
        delete user.password;
        Promise.all(user.items.map(async item => {
            const categories = await Items.getItemsCategories(item.id);
            const favorited = await Favorites.getFavoritesCount(item.id)
            item.favorited = favorited.count;
            item.categories = categories;
            return item;
        }))
            .then(items => {
                res.status(200).json({ user });
            })
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ---------------------- Edit User By Id ---------------------- //

router.put("/:id", verifyUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.updateUser(id, changes)
        .then(updatedUser => {
            delete updatedUser.password;
            res.status(201).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}
);


// ---------------------- DELETE User By Id ---------------------- //

router.delete("/:id", verifyUserId, (req, res) => {
    const id = req.params.id;

    Users.deleteUser(id)
        .then(deletedUser => {
            res.status(200).json({ message: "User successfully deleted." });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyUserId(req, res, next) {
    const id = req.params.id;

    Users.getUserById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "User Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}

module.exports = router;