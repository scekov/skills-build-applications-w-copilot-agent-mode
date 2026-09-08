import { Router } from 'express';
import { Activity } from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;