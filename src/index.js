const express = require("express");
const app = express();
const router = require("./Routers/apiRouters");
const accountModel = require("./Models/accountModel");
const port = 3000;

/**
 * Body-Parser in express
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user/", router);

app.listen(port, (req, res) => {
    console.log("Server is listening");
});
