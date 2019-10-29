const router = require("express").Router();

const Category = require("./categories-model.js");


// ---------------------- /api/category ---------------------- //

router.get("/", (req, res) => {
    Category.getAllCategoriesWithItems()
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ------------------- GET Item By Id /api/category/:id ------------------- //

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Category.getCategoryById(id)
        .then(category => {
            res.status(200).json(category);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

// ---------------------- Post New Item /api/category ---------------------- //

router.post("/", (req, res) => {
    req.body.type = req.body.type.toLowerCase();

    Category.addNewCategory(req.body)
        .then(category => {
            res.status(201).json(category)
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Category.deleteCategory(id)
        .then(deleted => {
            res.status(200).json({ message: "Category successfully deleted." })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

module.exports = router;