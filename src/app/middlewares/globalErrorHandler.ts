import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessages } from '../../interfaces/error'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went wrong'
  const errorMessages: IGenericErrorMessages[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err.stack : undefined,
  })

  next()
}

export default globalErrorHandler
