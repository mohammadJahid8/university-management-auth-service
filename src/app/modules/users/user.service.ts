import ApiError from '../../../Erros/ApiError'
import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto generated increamental id
  const id = await generatedUserId()

  user.id = id
  // default pass
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

export const UserService = {
  createUserService,
}
