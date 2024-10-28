const express = require("express");
const itemsRoutes = require("./items");
const app = express();

app.use("/items", itemsRoutes);

module.exports = app;

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});