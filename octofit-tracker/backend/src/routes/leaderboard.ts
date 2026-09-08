import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_request, response) => {
  response.json([]);
});

export default leaderboardRouter;