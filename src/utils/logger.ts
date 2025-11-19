import path from 'path';
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';
const logDirectory = path.join(__dirname, "../../logs");
/**
 * Logger instance using Pino
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    }
    : {
      // log to files
      targets: [
        // INFO + WARN logs
        {
          target: "pino/file",
          level: "info",
          options: {
            destination: `${logDirectory}/app.log`,
            mkdir: true,
          },
        },

        // ERROR logs
        {
          target: "pino/file",
          level: "error",
          options: {
            destination: `${logDirectory}/error.log`,
            mkdir: true,
          },
        },
      ],
    },
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Create child logger with additional context
 */
export const createLogger = (context: Record<string, any>) => {
  return logger.child(context);
};
