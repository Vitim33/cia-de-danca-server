const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evaluation = sequelize.define(
  "Evaluation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    championshipId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "main",
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criterion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    evaluatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    evaluatorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["championshipId", "groupName", "criterion", "evaluatorId"],
      },
    ],
  }
);

module.exports = Evaluation;
