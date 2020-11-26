import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);


// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// nao precisa coloca '/appointments' porque no index.ts ja foi definido que sera tudo redirecionado para o appointmentsRoute

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
