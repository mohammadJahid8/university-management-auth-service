import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // req validation

    // const createUserZodSchema = z.object({
    //   body: z.object({
    //     role: z.string({
    //       required_error: 'Role is required',
    //     }),
    //     password: z.string().optional(),
    //   }),
    // })

    // await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUserService(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
