import { Router } from 'express';

import EventController from './controllers/EventController';

const routes = new Router();

routes.get('/', EventController.list);
routes.get('/search', EventController.search);
routes.get('/:id', EventController.read);

export default routes;
