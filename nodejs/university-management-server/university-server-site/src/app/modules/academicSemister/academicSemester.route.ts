import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterSchemaValidations } from './academicSemester.validation';

const router = express.Router();

// define user route
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterSchemaValidations.createAcademicSemesterSchemaValidation,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.delete('/:id', AcademicSemesterControllers.deleteSingleAcademicSemester);
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterSchemaValidations.updateAcademicSemesterSchemaValidation,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
