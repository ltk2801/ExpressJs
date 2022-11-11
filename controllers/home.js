const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.fetchAll((users) => {
    res.render("home/user-list", {
      persons: users,
      pageTitle: "All Users",
      path: "/users",
    });
  });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.fetchUser(userId, (person) => {
    res.render("home/user-detail", {
      user: person,
      pageTitle: person.last_name,
      path: "/users",
    });
  });
};

exports.getHome = (req, res, next) => {
  User.fetchAll((users) => {
    res.render("home/index", {
      persons: users,
      pageTitle: "Home",
      path: "/",
    });
  });
};
