module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tickets', 'event_id', {
      type: Sequelize.STRING,
      references: { model: 'events', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNul: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('tickets', 'event_id');
  }
};
