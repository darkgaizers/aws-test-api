const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@scg.com',
        first_name: 'User1',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user2@scg.com',
        first_name: 'User2',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user3@scg.com',
        first_name: 'User3',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user4@scg.com',
        first_name: 'User4',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user5@scg.com',
        first_name: 'User5',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user6@scg.com',
        first_name: 'User6',
        last_name: 'SCG',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'dunso@scg.com',
        first_name: 'Group',
        last_name: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => await queryInterface.bulkDelete('users', null, {}),
};
