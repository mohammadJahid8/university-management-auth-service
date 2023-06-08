import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    // console.log('test', req.body);
    // const { ...academicSemesterData } = req.body;
    // console.log(academicSemesterData);
    const result = await AcademicSemesterService.createSemester(req.body);

    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
