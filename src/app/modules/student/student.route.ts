import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getAllStudents);
router.get('/', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
