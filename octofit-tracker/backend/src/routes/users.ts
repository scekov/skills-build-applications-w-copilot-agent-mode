import { Router } from 'express';
import { User } from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default usersRouter;