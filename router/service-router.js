const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/service-controller");

router.route("/service")
  .get(servicesController);

module.exports = router;
