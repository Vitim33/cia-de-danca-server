const evaluationService = require("../services/evaluation.service");
const championshipData = require("../data/championship.data");

const DEFAULT_CHAMPIONSHIP_ID = "main";

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const findChampionship = (championshipId = DEFAULT_CHAMPIONSHIP_ID) =>
  championshipData.championships.find((championship) => championship.id === championshipId);

class ChampionshipController {
  async getAppData(_req, res, next) {
    try {
      const data = await evaluationService.getAppData();
      res.json({
        success: true,
        message: "Dados do campeonato obtidos com sucesso",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async listEvaluations(_req, res, next) {
    try {
      const evaluations = await evaluationService.listEvaluations();
      res.json({
        success: true,
        message: "Avaliacoes obtidas com sucesso",
        data: evaluations,
      });
    } catch (error) {
      next(error);
    }
  }

  async saveEvaluation(req, res, next) {
    try {
      const { groupName, criterion, score, comment, championshipId } = req.body;

      if (!groupName || !criterion || typeof score !== "number") {
        return res.status(400).json({
          success: false,
          message: "Informe groupName, criterion e score numerico",
        });
      }

      if (score < 0 || score > 10) {
        return res.status(400).json({
          success: false,
          message: "A nota deve estar entre 0 e 10",
        });
      }

      if (req.user.role !== "evaluator") {
        return res.status(403).json({
          success: false,
          message: "Apenas avaliadores podem enviar avaliacoes",
        });
      }

      const championship = findChampionship(championshipId);
      const evaluatorEmails = championship?.evaluatorEmails || [];
      const evaluatorEmail = normalizeEmail(req.user.email);
      if (
        evaluatorEmails.length > 0 &&
        !evaluatorEmails.map(normalizeEmail).includes(evaluatorEmail)
      ) {
        return res.status(403).json({
          success: false,
          message: "Avaliador sem permissao para este campeonato",
        });
      }

      const evaluation = await evaluationService.saveEvaluation({
        championshipId,
        groupName,
        criterion,
        score,
        comment,
        evaluator: req.user,
      });
      const appData = await evaluationService.getAppData(championshipId);

      return res.status(201).json({
        success: true,
        message: "Avaliacao salva com sucesso",
        data: {
          evaluation,
          appData,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ChampionshipController();
