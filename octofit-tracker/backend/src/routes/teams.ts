import { Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/', (_request, response) => {
  response.json([]);
});

export default teamsRouter;