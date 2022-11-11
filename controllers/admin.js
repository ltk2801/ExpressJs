const User = require("../models/user");

exports.getAddUser = (req, res, next) => {
  res.render("admin/edit-user", {
    pageTitle: "Add User",
    path: "/admin/add-user",
    editing: false,
  });
};

exports.postAddUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const avatar = req.body.imageUrl;
  const user = new User(null, email, firstName, lastName, avatar);
  user.save();
  res.redirect("/");
};

exports.getEditUser = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const userId = req.params.userId;
  User.fetchUser(userId, (person) => {
    if (!person) {
      return res.redirect("/");
    }
    res.render("admin/edit-user", {
      pageTitle: "Edit User",
      path: "/admin/edit-user",
      editing: editMode,
      person: person,
    });
  });
};

exports.postEditUser = (req, res, next) => {
  const userId = req.body.userId;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedEmail = req.body.email;
  const updatedAvatar = req.body.imageUrl;
  const updatedUser = new User(
    userId,
    updatedEmail,
    updatedFirstName,
    updatedLastName,
    updatedAvatar
  );
  updatedUser.save();
  res.redirect("/admin/users");
};

exports.getUsers = (req, res, next) => {
  User.fetchAll((users) => {
    res.render("admin/users", {
      persons: users,
      pageTitle: "Admin Users",
      path: "/admin/users",
    });
  });
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.deleteById(userId);
  res.redirect("/");
};
