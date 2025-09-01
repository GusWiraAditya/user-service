"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Complaint, { foreignKey: "user_id" });
      User.hasMany(models.Feedback, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      credential_id: DataTypes.STRING,
      nickname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      full_name: DataTypes.STRING,
      gender: DataTypes.ENUM("pria", "wanita", "lainnya"),
      date_of_birth: DataTypes.DATEONLY,
      address: DataTypes.TEXT,
      no_nik: DataTypes.STRING(16),
      photo_ktp: DataTypes.STRING,
      contribution: DataTypes.ENUM(
        "vvip",
        "vip",
        "karyawan dari partner",
        "pelanggan biasa",
        "supporter"
      ),
      village: DataTypes.STRING,
      subdistrict: DataTypes.STRING,
      post_code: DataTypes.STRING(10),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      paranoid: true,
    }
  );
  return User;
};
