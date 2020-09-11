import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// tudo o que vier de /appointments, seja GET, PUT, DELETE vai ser tratado pelo appointmentsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
