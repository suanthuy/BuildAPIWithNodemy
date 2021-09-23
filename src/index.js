const express = require("express");
const app = express();
const router = require("./routers/index.routers");
const accountModel = require("./models/account.model");
const path = require("path");
const port = 3000;

/**
 * Body-Parser in express
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 *  Using express.static to public a folder
 *  Now, folder ./public is a public folder and client can access to it by localhost:3000/public
 */
app.use("/public", express.static(path.join(__dirname, "/public")));

router(app);

app.listen(port, (req, res) => {
    console.log("Server is listening at port 3000");
});
