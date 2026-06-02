const express = require("express");
const championshipController = require("../controllers/championship.controller");

const router = express.Router();

router.get("/app-data", championshipController.getAppData.bind(championshipController));

module.exports = router;
