import cors from 'cors'
import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import routes

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
// import ApiError from './Erros/ApiError'

// all routes
app.use('/api/v1/users/', UserRoutes)

// default route
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to the university server!')
})

// global error handler
app.use(globalErrorHandler)

export default app
