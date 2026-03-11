import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

/**
 * Structured logger using pino.
 *
 * In development: pretty-printed output with colors
 * In production: JSON output for log aggregation
 * In test: silent to avoid noise
 */
export const logger = pino({
  level: isTest ? "silent" : process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
  // Redact sensitive fields from logs
  redact: {
    paths: ["password", "token", "apiKey", "authorization", "cookie", "*.password", "*.token"],
    censor: "[REDACTED]",
  },
  // Base context included in all logs
  base: {
    app: "bushwick-maps",
    env: process.env.NODE_ENV || "development",
  },
});

/**
 * Create a child logger with additional context.
 * Useful for adding request-specific or component-specific fields.
 *
 * @example
 * const mapLogger = createLogger({ component: 'map-view' });
 * mapLogger.info({ placeId: '123' }, 'Place selected');
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

// Pre-configured loggers for common components
export const mapLogger = createLogger({ component: "map" });
export const dataLogger = createLogger({ component: "data" });
export const apiLogger = createLogger({ component: "api" });

export default logger;
