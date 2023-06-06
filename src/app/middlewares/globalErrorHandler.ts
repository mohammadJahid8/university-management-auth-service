/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ApiError from '../../Erros/ApiError'
import config from '../../config'
import { IGenericErrorMessages } from '../../interfaces/error'
import handleValidationError from '../../interfaces/handleValidationError'
import { errLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('From global error handler: ', error)
    : errLogger.error('From global error handler: ', error)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessages[] = []

  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorMessages = simplifyError.errorMessages
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
