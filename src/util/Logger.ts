import winston from 'winston'
import fs from 'fs'
import DailyRotateFile from 'winston-daily-rotate-file'

const logPath = `${process.cwd()}/log`
if (!fs.existsSync(logPath))
    fs.mkdirSync(logPath)

export const log = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((debug) => {
                    const {
                        timestamp, level, message, ...args
                    } = debug
  
                    const ts = timestamp.slice(0, 19).replace('T', ' ')
                    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
                })
            ),
        }),
        new DailyRotateFile({
            level: 'info',
            filename: `${logPath}/server-%DATE%.log`,
            maxSize: '1m',
            maxFiles: '7d',
        }),
    ],
})
