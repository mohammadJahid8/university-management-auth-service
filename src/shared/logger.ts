import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const dateTime = `${date.toDateString()}-${hour}:${min}:${sec}`;

  return `${dateTime} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errLogger };
