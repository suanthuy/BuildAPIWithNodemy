const express = require("express");
const accountModel = require("../models/account.model");
const PAGE_SIZE = 2;

let router = express.Router(); // router should be let variable.

router.get("/", (req, res, next) => {
    let page = parseInt(req.query.page);
    if (page) {
        /**
         *  GET page
         */
        if (page < 1) {
            page = 1;
        }

        let skip = (page - 1) * PAGE_SIZE;

        accountModel
            .find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json("Server Error");
            });
    } else {
        /**
         *  GET all users
         */
        accountModel
            .find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json("Server Error");
            });
    }
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
