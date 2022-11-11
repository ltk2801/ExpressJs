const express = require("express");

const userController = require("../controllers/home");

const router = express.Router();

router.get("/", userController.getHome);

router.get("/users", userController.getUsers);

router.get("/users/:userId", userController.getUser);

module.exports = router;
