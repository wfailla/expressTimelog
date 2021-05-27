import { Router } from 'express';
import { logTime } from './sink';
import { getLog } from './source';


// Export the base-router
const baseRouter = Router();
baseRouter.post('/log', logTime);
baseRouter.get('/log', getLog);
export default baseRouter;
