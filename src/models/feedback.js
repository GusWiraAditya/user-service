"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // Sebuah Feedback dimiliki oleh satu User
      Feedback.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      partner_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Feedback",
      timestamps: true,
    }
  );
  return Feedback;
};
