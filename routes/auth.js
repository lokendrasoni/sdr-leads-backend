const router = require("express").Router();
const authController = require("../controllers/auth");
const { isAuth } = require("../middlewares");
const authSchema = require("../schemas/auth");
const validate = require("../utilities/validate");

router.post("/login", validate(authSchema.login), authController.login);
router.post("/register", validate(authSchema.register), authController.register);
router.get("/status", isAuth, (req, res) => { res.json({ success: true, data: req.auth.user }) });
router.put("/change-password", validate(authSchema.changePassword), isAuth, authController.changePassword);

module.exports = router;