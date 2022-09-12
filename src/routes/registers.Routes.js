import express from 'express';
import * as registersController from '../Controllers/registersController.js';
import autorizationMiddleware from '../Middlewares/autorization.middleware.js'

const router = express.Router();

router.use(autorizationMiddleware);

router.post('/registers',registersController.postRegisters);
router.get('/registers', registersController.getRegisters);

export default router;