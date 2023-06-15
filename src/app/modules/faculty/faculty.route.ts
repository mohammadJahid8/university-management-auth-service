import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './faculty.controller';
import { StudentValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', StudentController.getAllStudents);
router.get('/', StudentController.getSingleStudent);
router.delete('/', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
