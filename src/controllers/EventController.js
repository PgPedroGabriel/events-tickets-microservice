import { Op } from 'sequelize';
import Event from '../models/Event';
import Ticket from '../models/Ticket';

class EventController {
  /**
   * List of events
   */
  static async list(req, res) {
    const users = await Event.findAndCountAll({
      attributes: ['id', 'name', 'convenience_tax', 'createdAt', 'updatedAt'],
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
      attributes: ['id', 'name', 'convenience_tax', 'createdAt', 'updatedAt'],
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

  /**
   * Filter events tickets
   * sample request body structure
   * [
   *   {
   *     event_id: '...',
   *     tickets: [
   *       {
   *         ticket_id: '...',
   *       }
   *     ]
   *   }
   * ]
   *
   * @return array of events and tickets avaliablety
   */

  static async filterEventsTickets(req, res) {
    const arrayEvents = req.body;

    if (!arrayEvents.length) {
      return res.status(400).send();
    }
    // Filter tickets of req.body
    const arrayTickets = arrayEvents.reduce((accumulator, event) => {
      event.tickets.forEach(ticketId => accumulator.push(ticketId));
      return accumulator;
    }, []);

    // Search Events
    const events = await Event.findAll({
      attributes: ['id', 'name', 'convenience_tax'],
      where: {
        id: arrayEvents.map(el => el.event_id)
      },
      include: [
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'name', 'price', 'qty_available'],
          required: false,
          where: {
            id: arrayTickets
          }
        }
      ]
    });

    return res.json(events);
  }
}

export default EventController;
