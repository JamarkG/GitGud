"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          userId: 1, //Changed from 1 to 3 because of db conflicts
          title: "How to beat Halo in legendary",
          textField:
            "I'm struggling to beat Halo in legendary any tips or advice?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "Valheim how to level up faster",
          textField:
            "I am stuck on how to level up the workbench can someone explain to me how to level it up?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Best gun in CoD?",
          textField: "Whats the best gun in the game? Is it the sniper??",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: "Is there a coop mode in the last of us?",
          textField: "I can't find info on this",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "Best place to buy games online?",
          textField:
            "I feel like steam doesn't have the best deals anymore, is there something else",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Stuck in the bloodborne tutorial",
          textField: "How can I beat the firts monster? I've tried everything!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: "Can't find a game in battlefield!",
          textField:
            "I've beedn waiting for two hours for a single game and nothing!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Is the nintendo switch worth it anymore??",
          textField: "Currently own the xsx and ps5, is the switch worth it?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
