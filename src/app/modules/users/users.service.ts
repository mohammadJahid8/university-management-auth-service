import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config'
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
    throw new Error('Failed to create user')
  }
  return createdUser
}
