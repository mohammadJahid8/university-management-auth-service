import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errLogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to MongoDB')

    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`)
    })
  } catch (err) {
    errLogger.error('Failed to connect db', err)
  }
}

main()
