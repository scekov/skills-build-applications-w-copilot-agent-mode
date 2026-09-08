import { Router } from 'express';
import { Team } from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email').sort({ name: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;