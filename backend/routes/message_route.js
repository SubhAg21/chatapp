import express from 'express';

import { getMessage, sendMessage } from '../controller/message_controller.js';
import secureRoute from '../middleware/secureRoute.js';

const messageRoute = express.Router();
messageRoute.post('/send/:id', secureRoute, sendMessage);
messageRoute.get('/get/:id', secureRoute, getMessage);

export default messageRoute;