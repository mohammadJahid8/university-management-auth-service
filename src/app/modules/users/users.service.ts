import ApiError from '../../../Erros/ApiError'
import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserId } from './users.utils'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
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
