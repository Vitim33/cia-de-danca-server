const Evaluation = require("../models/evaluation.model");
const championshipData = require("../data/championship.data");

const DEFAULT_CHAMPIONSHIP_ID = "main";

const roundScore = (value) => Math.round(value * 10) / 10;

class EvaluationService {
  async saveEvaluation({
    championshipId = DEFAULT_CHAMPIONSHIP_ID,
    groupName,
    criterion,
    score,
    comment,
    evaluator,
  }) {
    const normalizedGroupName = groupName.trim();
    const normalizedCriterion = criterion.trim();

    const existingEvaluation = await Evaluation.findOne({
      where: {
        championshipId,
        groupName: normalizedGroupName,
        criterion: normalizedCriterion,
        evaluatorId: evaluator.id,
      },
    });

    if (existingEvaluation) {
      existingEvaluation.score = score;
      existingEvaluation.comment = comment || null;
      existingEvaluation.evaluatorEmail = evaluator.email;
      await existingEvaluation.save();
      return existingEvaluation;
    }

    return Evaluation.create({
      championshipId,
      groupName: normalizedGroupName,
      criterion: normalizedCriterion,
      score,
      comment: comment || null,
      evaluatorId: evaluator.id,
      evaluatorEmail: evaluator.email,
    });
  }

  async listEvaluations(championshipId = DEFAULT_CHAMPIONSHIP_ID) {
    return Evaluation.findAll({
      where: { championshipId },
      order: [["updatedAt", "DESC"]],
    });
  }

  async getLiveGroups(championshipId = DEFAULT_CHAMPIONSHIP_ID) {
    const evaluations = await this.listEvaluations(championshipId);
    const groupedScores = new Map();

    evaluations.forEach((evaluation) => {
      const current = groupedScores.get(evaluation.groupName) || {
        total: 0,
        count: 0,
      };
      current.total += Number(evaluation.score);
      current.count += 1;
      groupedScores.set(evaluation.groupName, current);
    });

    return championshipData.groups.map((group) => {
      const scores = groupedScores.get(group.name);
      const evaluationsCount = scores?.count || 0;
      const score = evaluationsCount > 0 ? roundScore(scores.total / evaluationsCount) : 0;

      return {
        ...group,
        score,
        averageScore: score,
        evaluationsCount,
        isBeingEvaluated: group.name === championshipData.performance.groupName,
      };
    });
  }

  async getAppData(championshipId = DEFAULT_CHAMPIONSHIP_ID) {
    const groups = await this.getLiveGroups(championshipId);

    return {
      ...championshipData,
      groups,
    };
  }
}

module.exports = new EvaluationService();
