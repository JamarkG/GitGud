'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Posts",
			[
				{
          userId: 1,
					title: "How to beat Halo in legendary",
					textField: "I'm struggling to beat Halo in legendary any tips or advice?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
				{
          userId: 2,
					title: "Valheim how to level up faster",
					textField: "I am stuck on how to level up the workbench can someone explain to me how to level it up?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
			],
			{}
		);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
