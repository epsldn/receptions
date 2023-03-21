'use strict';

const bcrypt = require("bcryptjs");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert("Users", [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "bobbie@aa.io",
        username: "bobbuilds123",
        hashedPassword: bcrypt.hashSync("password2")
      },
      {
        email: "steven@aa.io",
        username: "StevenSon",
        hashedPassword: bcrypt.hashSync("password3")
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete("Users", {
      username: {
        [Op.in]: ["Demo-lition", "bobbuilds123", "StevenSon"]
      }
    }, {});
  }
};
