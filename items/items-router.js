const router = require("express").Router();

const Items = require("./items-model.js");


// ---------------------- /api/items ---------------------- //

router.get("/", (req, res) => {
    Items.getAllItems()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ------------------- GET Item By Id /api/items/:id ------------------- //

router.get("/:id", verifyItemExists, (req, res) => {
    const id = req.params.id;

    Items.getItemById(id)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ---------------------- Post New Item /api/items ---------------------- //

router.post("/", (req, res) => {
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