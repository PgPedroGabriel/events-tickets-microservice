import Sequelize from 'sequelize';

import Event from '../models/Event';
import Ticket from '../models/Ticket';
import relational from '../configs/databases';

const models = [Event, Ticket];

class Database {
  constructor() {
    this.relationalDatabase();
  }

  relationalDatabase() {
    this.connection = new Sequelize(relational);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associete && model.associete(this.connection.models))
      .map(model => this.connection.sync(model));
  }
}

export default new Database();
