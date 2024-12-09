import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// define user route
router.get('/create-user', UserControllers.createUser);

export const UserRoutes = router;
