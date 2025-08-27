// src/logger.ts
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // structured JSON logs (best for CloudWatch)
  ),
  transports: [
    // Console logs → CloudWatch agent picks them up
    new winston.transports.Console(),
    // Local log files
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
