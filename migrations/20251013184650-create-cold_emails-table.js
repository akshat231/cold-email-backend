'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if table exists
    const tableExists = await queryInterface.sequelize.query(
      `SELECT to_regclass('public.cold_emails') AS table_name;`
    );

    if (!tableExists[0][0].table_name) {
      // Table does not exist, create it
      await queryInterface.createTable('cold_emails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        company: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
        },
        last_sent: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
      });
    } else {
      console.log('Table cold_emails already exists, skipping creation.');
    }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cold_emails');
  },
};
