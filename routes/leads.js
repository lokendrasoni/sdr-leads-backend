const router = require("express").Router();
const leadsController = require("../controllers/leads");
const { isAuth } = require("../middlewares");
const leadsSchema = require("../schemas/leads");
const validate = require("../utilities/validate");

router.get("/report", isAuth, leadsController.report);
router.get("/", isAuth, validate(leadsSchema.leads), leadsController.leads);

module.exports = router;