const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//For Register Page
const registerView = (req, res) => {
  res.render("users/register", {});
};

//Post Request for Register

const registerUser = (req, res) => {
  const { name, password, confirm } = req.body;

  if (!name || !password || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findOne({ name: name }).then((user) => {
      if (user) {
        console.log("name exists");
        res.render("users/register", {
          name,
          password,
          confirm,
        });
      } else {
        //Validation
        const newUser = new User({
          name,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// For View
const loginView = (req, res) => {
  res.render("users/login", {});
};

//Logging in Function

const loginUser = (req, res) => {
  const { name, password } = req.body;

  //Required
  if (!name || !password) {
    console.log("Please fill in all the fields");
    res.render("users/login", {
      name,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "users/dashboard",
      failureRedirect: "users/login",
      failureFlash: true,
    })(req, res);
  }
};

const logoutView = (req, res) => {
    req.logout();
    res.redirect("/");
}

//For Bakery Page
const cakesView = (req, res) => {
  res.render("users/cakes", {});
};
//For Community Page
const communityView = (req, res) => {
  res.render("users/community", {});
};



module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  cakesView,
  communityView,
  logoutView,
};