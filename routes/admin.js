const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-user => GET
router.get("/add-user", adminController.getAddUser);

// /admin/users => GET
router.get("/users", adminController.getUsers);

// /admin/add-user => POST
router.post("/add-user", adminController.postAddUser);

router.get("/edit-user/:userId", adminController.getEditUser);

router.post("/edit-user", adminController.postEditUser);

router.post("/delete-user", adminController.postDeleteUser);

module.exports = router;
