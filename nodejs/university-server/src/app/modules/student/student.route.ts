import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// Define routes
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.post('/create-student', StudentControllers.createStudent);

export const StudentRoutes = router;
