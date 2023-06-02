import cors from 'cors'
import express, { Application, Response } from 'express'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import routes
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import userRouter from './app/modules/users/users.route'

// all routes
app.use('/api/v1/users/', userRouter)

// default route
app.get('/', async (req, res: Response) => {
  res.send('Welcome to the university server!')
})

// global error handler
app.use(globalErrorHandler)

export default app
