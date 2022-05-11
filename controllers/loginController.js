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
        req.session.message = {
          type: 'danger',
          intro: 'Empty fields! ',
          message: 'Please insert the requested information.'
        }
        res.render("users/register", {
          name,
          password,
          confirm
        } );
      } else {
        //Validation
        req.session.message = {
          type: 'success',
          intro: 'You are now registered! ',
          message: 'Please log in.'
        }
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
              .then(res.redirect("/login",))
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
    req.session.message = {
      type: 'danger',
      intro: 'Empty fields! ',
      message: 'Please insert the requested information.'
    }
    res.render("users/register", {
      name,
      password,
    });
  } else {
    req.session.message = {
      type: 'success',
      intro: 'You are now registered! ',
      message: 'Welcome.'
    }
    passport.authenticate("local", {
      successRedirect: "users/dashboard",
      failureRedirect: "users/register",
      failureFlash: true,
    })(req, res);
  }
};

const logoutView = (req, res) => {
    req.logout();
    req.session.message = {
      type: 'danger',
      intro: 'You are logged out.',
      message: 'Have a good day!'
    }
    res.redirect("/");
  
}
const cakesView = (req, res) => {
  res.render('users/cakes');
} 
const communityView = (req, res) => {
  res.render('users/community');
}


module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  cakesView,
  communityView,
  logoutView,
};