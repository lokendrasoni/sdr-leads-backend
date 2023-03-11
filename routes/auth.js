const router = require("express").Router();
const authController = require("../controllers/auth");
const { isAuth } = require("../middlewares");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/status", isAuth, (req, res) => { res.json({ success: true, data: req.auth.user }) });
router.put("/change-password", isAuth, authController.changePassword);

module.exports = router;