const router = require("express").Router();
var userController = require("./controllers/userController");

// DEFAULT API RESPONSE
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Movie-Rental crafted with love!",
  });
});

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

router.route("/tokenIsValid").post(userController.tokenIsValid);

// EXPORT API ROUTES
module.exports = router;
