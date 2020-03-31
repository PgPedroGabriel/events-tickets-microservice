import Ticket from '../models/Ticket';

class TicketsRepository {
  static async findByIds(ids = []) {
    const tickets = await Ticket.findAll({
      where: {
        id: ids
      },
      attributes: ['id', 'name', 'price', 'qty_available']
    });

    return tickets;
  }
}

export default TicketsRepository;
