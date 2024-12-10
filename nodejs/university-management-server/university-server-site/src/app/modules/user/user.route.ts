import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// define user route
router.get('/', UserControllers.getAllUser);
router.post('/create-student', UserControllers.createStudent);
// router.get('/:id', UserControllers.createUser);

export const UserRoutes = router;
