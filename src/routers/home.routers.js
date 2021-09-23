const express = require("express");
let router = express.Router(); // router should be let variable.

const path = require("path");

router.get("/", (req, res, next) => {
    let homePath = path.join(__dirname, "../public/home.html");
    res.sendFile(homePath);
});

module.exports = router;
