const appData = require("../data/championship.data");

class ChampionshipController {
  getAppData(_req, res) {
    res.json({
      success: true,
      message: "Dados do campeonato obtidos com sucesso",
      data: appData,
    });
  }
}

module.exports = new ChampionshipController();
