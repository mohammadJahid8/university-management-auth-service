import { NextFunction, Request, Response } from 'express'
import ApiError from '../../Erros/ApiError'
import config from '../../config'
import { IGenericErrorMessages } from '../../interfaces/error'
import handleValidationError from '../../interfaces/handleValidationError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessages[] = []

  if (err?.name === 'ValidationError') {
    const simplifyError = handleValidationError(err)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorMessages = simplifyError.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [{ path: 'error', message: err?.message }]
      : []
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err?.message
      ? [{ path: 'error', message: err?.message }]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err.stack : undefined,
  })

  next()
}

export default globalErrorHandler
