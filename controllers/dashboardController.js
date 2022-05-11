//For Register Page
const dashboardView = (req, res) => {
    res.render("users/dashboard", {
      user: req.user
    });
  };
  module.exports = {
    dashboardView,
  }