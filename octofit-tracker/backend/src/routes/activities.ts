import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter.get('/', (_request, response) => {
  response.json([]);
});

export default activitiesRouter;