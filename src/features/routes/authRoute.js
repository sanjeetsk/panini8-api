import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import jwtAuth from '../../middlewares/auth.middleware.js';

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
// authRouter.get('/count', authController.getCount);
// authRouter.get('/me', jwtAuth, authController.getCurrentUser);

export default authRouter;