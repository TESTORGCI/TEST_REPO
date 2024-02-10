import { Router } from 'express';
import healthzController from '../Controllers/healthzController.js';
import usersController from '../Controllers/usersController.js';
import basicAuthentication from '../Middlewear/authService.js';
import databaseService from '../Middlewear/databaseService.js';

//INITIALIZE ROUTER
const router = Router();

//MAPPING ENDPOINTS WITH ROUTER
router.get('/healthz', healthzController.getHealth);
router.post('/v1/user', databaseService, usersController.createUser);
router.get('/v1/user/self', databaseService, basicAuthentication, usersController.getUser);
router.put('/v1/user/self', databaseService, basicAuthentication, usersController.updateUser);
router.all('/healthz', healthzController.methodNotAllowed);
router.all('/v1/user', healthzController.methodNotAllowed);
router.all('/v1/user/self', healthzController.methodNotAllowed);


//HANDLE ERRONEOUS ROUTES
router.use((request, response, next) => {
    response.status(404).header('Cache-Control', 'no-cache, no-store, must-revalidate').end();
    next();
});


export default router;