import { Router } from 'express';
import { logTime } from './sink';


// Export the base-router
const baseRouter = Router();
baseRouter.post('/log', logTime);
export default baseRouter;
