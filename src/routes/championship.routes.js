const express = require("express");
const championshipController = require("../controllers/championship.controller");
const authenticateToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/app-data", championshipController.getAppData.bind(championshipController));
router.get(
  "/evaluations",
  authenticateToken,
  championshipController.listEvaluations.bind(championshipController)
);
router.post(
  "/evaluations",
  authenticateToken,
  championshipController.saveEvaluation.bind(championshipController)
);

module.exports = router;
