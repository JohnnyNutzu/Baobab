const express = require("express");

const {
  registerView,
  loginView,
  registerUser,
  loginUser,
  cakesView,
  communityView,
  logoutView
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/cakes", cakesView);
router.get("/community", communityView);

router.get("/register", registerView);
router.get("/login", loginView);
//Dashboard
router.get("/users/dashboard", protectRoute, dashboardView);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout', logoutView);

module.exports = router;