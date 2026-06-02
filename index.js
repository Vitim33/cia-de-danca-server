require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const sequelize = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/docs", express.static(path.join(__dirname, "docs")));

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require("./src/routes/user.routes");
const championshipRoutes = require("./src/routes/championship.routes");

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Cia de Danca API online" });
});

app.use("/users", userRoutes);
app.use("/championship", championshipRoutes);

const errorHandler = require("./src/utils/errorHandler");
app.use(errorHandler);

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexao com o banco de dados estabelecida com sucesso.");
    await sequelize.sync({ alter: true });
    console.log("Modelos da Cia de Danca sincronizados com o banco de dados.");
  } catch (error) {
    console.error("Erro ao conectar ou sincronizar o banco:", error);
  }
};

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Cia de Danca API rodando na porta ${PORT}`);
    console.log(`Swagger disponivel em http://localhost:${PORT}/api-docs`);
  });
});
