const uuid = require('uuid');

module.exports = {
  up: async queryInterface => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    const eventSaoJoao = await queryInterface.rawSelect(
      'events',
      {
        where: {
          name: 'São João'
        }
      },
      ['id']
    );

    const eventCarnaval = await queryInterface.rawSelect(
      'events',
      {
        where: {
          name: 'Carnaval'
        }
      },
      ['id']
    );
    return queryInterface.bulkInsert(
      'tickets',
      [
        {
          name: 'Pista',
          price: 100.0,
          qty_available: 50,
          id: uuid.v4(),
          created_at: new Date(),
          updated_at: new Date(),
          event_id: eventSaoJoao
        },
        {
          name: 'Camarote',
          price: 200.0,
          qty_available: 25,
          id: uuid.v4(),
          created_at: new Date(),
          updated_at: new Date(),
          event_id: eventSaoJoao
        },
        {
          name: 'Pista',
          price: 250.0,
          qty_available: 100,
          id: uuid.v4(),
          created_at: new Date(),
          updated_at: new Date(),
          event_id: eventCarnaval
        },
        {
          name: 'Camarote',
          price: 500.0,
          qty_available: 15,
          id: uuid.v4(),
          created_at: new Date(),
          updated_at: new Date(),
          event_id: eventCarnaval
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('People', null, {});
  }
};
