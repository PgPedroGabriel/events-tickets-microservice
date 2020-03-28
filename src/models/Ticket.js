import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';

class Ticket extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        qty_available: {
          type: Sequelize.INTEGER
        }
      },
      {
        sequelize: connection
      }
    );

    this.addHook('beforeCreate', event => {
      // eslint-disable-next-line no-param-reassign
      event.id = uuidv4();
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
  }
}

export default Ticket;
