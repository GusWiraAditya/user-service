'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "address", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "village", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "subdistrict", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "post_code", {
      type: Sequelize.STRING(10),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "address", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "village", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "subdistrict", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "post_code", {
      type: Sequelize.STRING(10),
      allowNull: false,
    });
  },
};
