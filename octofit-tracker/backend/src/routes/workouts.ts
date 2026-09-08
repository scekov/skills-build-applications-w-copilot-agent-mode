import { Router } from 'express';

const workoutsRouter = Router();

workoutsRouter.get('/', (_request, response) => {
  response.json([]);
});

export default workoutsRouter;