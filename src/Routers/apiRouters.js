const express = require("express");
let router = express.Router(); // router should be let variable.
const accountModel = require("../Models/accountModel");

router.get("/", (req, res, next) => {
    accountModel
        .find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

router.get("/:id", (req, res, next) => {
    let id = req.params.id;

    accountModel
        .findOne({
            _id: id,
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

router.get("/login", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    accountModel
        .findOne({
            username: username,
            password: password,
        })
        .then((data) => {
            if (data) {
                res.json("Login successfully!!!");
            } else {
                res.json("Login failed!!!");
            }
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

router.post("/register", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    accountModel
        .findOne({
            username: username,
        })
        .then((data) => {
            if (data) {
                res.json("Account is available");
            } else {
                accountModel.create({
                    username: username,
                    password: password,
                });
            }
        })
        .then((data) => {
            res.json("Create account successfully!!!");
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

router.put("/:id", (req, res, next) => {
    let id = req.params.id;
    let newPassword = req.body.newPassword;

    accountModel
        .findByIdAndUpdate(id, {
            password: newPassword,
        })
        .then((data) => {
            res.json("Update successfully!!!");
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id;

    accountModel
        .deleteOne({
            _id: id,
        })
        .then((data) => {
            res.json("Delete successfully!!!");
        })
        .catch((err) => {
            res.status(500).json("Server Error");
        });
});

module.exports = router;
