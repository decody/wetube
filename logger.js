import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;
const infoFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의
});

const logger = winston.createLogger({
    level: 'debug', // 최소 레벨
    transports: [
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.printf(
                info => `[${info.level.toUpperCase()}] - ${info.message}`
            )
        })
    ]
});

export default logger;
