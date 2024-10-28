const express = require("express");
const items = require("./fakeDb");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(items);
});

router.post("/", (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

router.get("/:name", (req, res) => {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
});

router.patch("/:name", (req, res) => {
    const item = items.find((i) => i.name === req.params.name);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
});

router.delete("/:name", (req, res) => {
    const itemIndex = items.findIndex((i) => i.name === req.params.name);
    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });

    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
});

module.exports = router;