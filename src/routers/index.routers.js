const express = require("express");

const homeRouter = require("./home.routers");
const userRouter = require("./user.routers");

function router(app) {
    app.use("/home", homeRouter);
    app.use("/users", userRouter);
}

module.exports = router;
