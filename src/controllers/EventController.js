import { Op } from 'sequelize';
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
  static async read(req, res) {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'name', 'price', 'qty_available']
        }
      ]
    });

    if (!event) {
      return res.status(404).send();
    }

    return res.json(event);
  }

  /**
   * Search events by name
   */
  static async search(req, res) {
    const { q } = req.query;

    if (!q) {
      return res.status(404).send();
    }
    const events = await Event.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      },
      attributes: ['id', 'name', 'createdAt', 'updatedAt']
    });

    if (!events || !events.length) {
      return res.status(404).send();
    }

    return res.json(events);
  }
}

export default EventController;
