"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Complaint extends Model {
    static associate(models) {
      Complaint.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Complaint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      service_id: DataTypes.INTEGER,
      service_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      partner_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Complaint",
      timestamps: true,
    }
  );
  return Complaint;
};
