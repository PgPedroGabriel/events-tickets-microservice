import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv';

class Event extends Model {
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
        description: {
          type: Sequelize.TEXT
        },
        convenience_tax: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
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
    this.hasMany(models.Ticket, { as: 'tickets' });
  }
}

export default Event;
