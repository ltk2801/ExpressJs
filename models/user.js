const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "userData.json"
);

const getUsersFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(id, email, first_name, last_name, avatar) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar = avatar;
  }

  save() {
    getUsersFromFile((users) => {
      if (this.id) {
        const existingUserIndex = users.findIndex(
          (person) => person.id === this.id
        );
        const updatedUsers = [...users];
        updatedUsers[existingUserIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedUsers), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        users.push(this);
        fs.writeFile(p, JSON.stringify(users), (err) => {
          console.log(err);
        });
      }
    });
  }
  static deleteById(id) {
    getUsersFromFile((users) => {
      const updatedUsers = users.filter((person) => person.id !== id);
      fs.writeFile(p, JSON.stringify(updatedUsers), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static fetchUser(id, cb) {
    getUsersFromFile((users) => {
      const user = users.find((u) => u.id === id);
      cb(user);
    });
  }
};
