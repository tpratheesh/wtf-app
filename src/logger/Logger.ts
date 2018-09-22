import * as winston from 'winston';
import { LoggerService } from '@nestjs/common';
var DailyRotateFile = require('winston-daily-rotate-file');


export class Logger implements LoggerService {

    private readonly logger;


    public static loggerOptions = {
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'dd MMM YYYY HH:mm:ss.sss'
            }),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console(),
            new DailyRotateFile({
                filename: 'application-%DATE%.log',
                dirname: 'logs',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d'
            })
        ],
    };

    constructor() {
        this.logger = (winston as any).createLogger(Logger.loggerOptions);
    }

    log(message: string): void {
        this.logger.info(message);
    }
    error(message: string, trace?: any): void {
        this.logger.error(message);
    }
    warn(message: string): void {
        this.logger.warn(message);
    }

}