import server from './app';
import './bootstrap';
import UpdateTicketAvailablety from './queue/workers/UpdateTicketAvailablety';

server.listen(process.env.PORT || 4000);
console.log(`Running on PORT ${process.env.PORT}`);

(async () => {
  const rabbitmqWorker = new UpdateTicketAvailablety();
  await rabbitmqWorker.connectQueue();
  rabbitmqWorker.subscribe();
})();
