import { Router } from 'express';

import EventController from './controllers/EventController';
import FilterEventsTicketsValidation from './services/FilterEventsTicketsValidation';

const routes = new Router();

routes.get('/', EventController.list);
routes.get('/search', EventController.search);
routes.get('/:id', EventController.read);
routes.post(
  '/filter-events-tickets',
  FilterEventsTicketsValidation,
  EventController.filterEventsTickets
);

export default routes;
