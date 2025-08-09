"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Complaints", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID, // Harus cocok dengan tipe data 'id' di tabel Users
        allowNull: false,
        references: {
          model: "Users", // Nama tabel yang direferensikan
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Sebaiknya ini juga reference ke tabel 'Services'
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      partner_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Complaints");
  },
};
