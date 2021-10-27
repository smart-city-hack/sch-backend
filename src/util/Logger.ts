import { pino } from 'pino'

export const logger = pino({
    name: 'sch-backend',
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
})