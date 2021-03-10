"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Tony",
          lastName: "Stark",
          emailAddress: "tony.stark@gmail.com",
          hashedPassword: bcrypt.hashSync("P@ssw0rd", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Steve",
          lastName: "Rogers",
          emailAddress: "steve.rogers@gmail.com",
          hashedPassword: bcrypt.hashSync("P@ssw0rd", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bruce",
          lastName: "Banner",
          emailAddress: "bruce.banner@gmail.com",
          hashedPassword: bcrypt.hashSync("P@ssw0rd", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Natasha",
          lastName: "Romanoff",
          emailAddress: "natasha.romanoff@gmail.com",
          hashedPassword: bcrypt.hashSync("P@ssw0rd", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Wanda",
          lastName: "Maximoff",
          emailAddress: "wanda.maximoff@gmail.com",
          hashedPassword: bcrypt.hashSync("P@ssw0rd", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
