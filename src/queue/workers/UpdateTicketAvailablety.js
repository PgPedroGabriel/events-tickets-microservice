/* eslint-disable no-param-reassign */
import RabbitMQ from '../RabbitMQ';
import TicketsRepository from '../../repositories/TicketsRepository';

class UpdateOrderWorker extends RabbitMQ {
  constructor() {
    super();

    this.exchange = process.env.RABBITMQ_EXCHANGE_PAYMENT_STATUS_CHANGED;
  }

  async subscribe() {
    await this.channel.assertExchange(this.exchange, 'fanout', {
      durable: false
    });

    const q = await this.channel.assertQueue('', {
      exclusive: true
    }); // Fila exclusiva para este fanout, quando a conexão se encerra ela é deletada

    console.log(
      ' [*] Waiting for messages in %s. To exit press CTRL+C',
      q.queue
    );
    this.channel.bindQueue(q.queue, this.exchange, '');
    this.channel.consume(q.queue, async msg => {
      if (msg && msg.content) {
        const json = JSON.parse(msg.content.toString());

        console.log(`Updating tickets availablety`);

        if (json.status === 'APPROVED') {
          const mapTicketsIdToQuantity = json.product.reduce(
            (accumulator, product) => {
              accumulator[product.id] = accumulator.quantity;

              return accumulator;
            },
            {}
          );

          const tickets = await TicketsRepository.findByIds(
            Object.keys(mapTicketsIdToQuantity)
          );

          tickets.forEach(async ticket => {
            ticket.qty_available -= mapTicketsIdToQuantity[ticket.id];
            console.log(`${ticket.id}`);

            await ticket.save();
          });
        }
      }

      this.channel.ack(msg); // remove from queue
    });
  }
}

export default UpdateOrderWorker;
