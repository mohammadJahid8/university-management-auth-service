import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ManagementDepartmentService.createManagementDepartment(
      req.body
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Management department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Management department got successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Management department got successfully!',
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully!',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully!',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
