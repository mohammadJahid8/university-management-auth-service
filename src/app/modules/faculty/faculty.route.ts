import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { StudentValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);
router.delete('/', FacultyController.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
