"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      credential_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        // Menggunakan STRING lebih aman untuk nomor telepon (bisa ada '+' atau '0' di depan)
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("pria", "wanita", "lainnya"),
        allowNull: false,
      },
      date_of_birth: {
        // DATEONLY hanya menyimpan tanggal, tanpa informasi waktu
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      no_nik: {
        // Menggunakan STRING untuk NIK karena bisa panjang dan unik
        type: Sequelize.STRING(16),
        allowNull: true, // Sesuai form sebelumnya, bisa null
        unique: true,
      },
      photo_ktp: {
        // Menyimpan URL atau path ke file gambar
        type: Sequelize.STRING,
        allowNull: true,
      },
      contribution: {
        type: Sequelize.ENUM(
          "vvip",
          "vip",
          "karyawan dari partner",
          "pelanggan biasa",
          "supporter"
        ),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true, 
      },
      village: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      subdistrict: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      post_code: {
        type: Sequelize.STRING(10),
        allowNull: true, 
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Users");
  },
};
