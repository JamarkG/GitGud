'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Topics', [
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Xbox'},
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Playstation' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'PC' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Nintendo Switch' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Virtual Reality' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'First-Person Shooter (FPS)' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Role-Playing Game (RPG)' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Racing' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Multiplayer Online Battle Arena (MOBA)' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Real-time Strategy' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Sports' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Action-Adventure' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Survival & Horror' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Sandbox' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Fortnite' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Minecraft' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'League of Legends (LoL)' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Call of Duty' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Mario Kart' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Warhammer' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Apex Legends' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Starcraft' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Resident Evil' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Madden NFL' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'F1 2020' },
        { createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Beatsaber' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Topics', null, {});

  }
};