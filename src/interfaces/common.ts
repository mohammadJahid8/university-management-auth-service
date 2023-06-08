import { IGenericErrorMessages } from './error';

export type IGenericErrorRespnse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};
