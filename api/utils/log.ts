import winston from 'winston';

const instanceId = process.env.HOSTNAME;

const logger = winston.createLogger({
    level: process.env.LEVEL_LOG ?? 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.colorize({ all: true }),
    ),
    defaultMeta: { service: 'api-rafa', instanceId: instanceId },
    transports: [
        new winston.transports.File({ filename: 'runtime/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'runtime/warn.log', level: 'warning' }),
        new winston.transports.File({ filename: 'runtime/app.log' })
    ]
});

// If we're not in production then **ALSO** log to the `console` with the colorized simple format.
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

winston.add(logger);

export default logger;
