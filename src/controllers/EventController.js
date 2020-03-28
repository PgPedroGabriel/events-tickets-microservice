/* eslint-disable camelcase */
import Event from '../models/Event';
import Ticket from '../models/Ticket';

class EventController {
  /**
   * List of events
   */
  static async list(req, res) {
    const users = await Event.findAndCountAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'name', 'price', 'qty_available']
        }
      ]
    });

    return res.json(users);
  }

  /**
   * Read event
   */
  // static async read(req, res) {
  //   const users = await User.findAndCountAll({
  //     attributes: ['name', 'username', 'email', 'createdAt', 'updatedAt', 'id']
  //   });

  //   return res.json(users);
  // }
}

export default EventController;
