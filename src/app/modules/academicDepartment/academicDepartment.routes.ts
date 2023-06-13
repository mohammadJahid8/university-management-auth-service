import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
