'use strict';
const { faker } = require('@faker-js/faker/locale/id_ID'); // Menggunakan lokal Indonesia
// const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// const SALT_ROUNDS = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    // const password = 'password123';
    // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const genders = ['pria', 'wanita'];
    const contributions = ['vvip', 'vip', 'karyawan dari partner', 'pelanggan biasa', 'supporter'];

    for (let i = 0; i < 10; i++) {
      const gender = faker.helpers.arrayElement(genders);
      
      users.push({
        id: uuidv4(),
        credential_id: `user-credential-${faker.string.alphanumeric(10)}`,
        nickname: faker.internet.userName().toLowerCase(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        full_name: faker.person.fullName({ sex: gender }),
        gender: gender,
        date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        address: faker.location.streetAddress(true),
        no_nik: faker.string.numeric(16),
        photo_ktp: faker.image.url(),
        contribution: faker.helpers.arrayElement(contributions),
        village: faker.location.city(),
        subdistrict: faker.location.state(),
        post_code: faker.location.zipCode(),
        // shared_by_user_id: null, 
        // shared_by_nickname: null,
        // shared_by_role: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};