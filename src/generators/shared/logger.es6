import winston from 'winston';

let logger = new (winston.Logger)({
  level: process.env.GENERATOR_LOG_LEVEL || 'error',
  transports: [new (winston.transports.Console)()]
});

export default logger;
