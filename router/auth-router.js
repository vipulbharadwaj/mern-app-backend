const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");

const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");



router.get('/', (req, res) => {
    res
    .status(200)
    .send(`Welcome to router page`);
});

router.route("/home").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/user").get(authMiddleware, authController.user);




router.get('/love', (req, res) => {
    res
    .status(200)
    .send(`Welcome to lovers page`);
});

module.exports = router;