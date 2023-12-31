import * as path from 'node:path';

import * as dotenv from 'dotenv';

import { getOsEnv, getOsEnvOptional } from './utils';

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}.local`,
  ),
});

const env = {
  appPath: __dirname,
  // appVersion: getOsEnv('API_VERSION'),
  apiUrl: getOsEnv('API_URL'),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  logs: {
    logDir: getOsEnv('LOG_DIR'),
    logFormat: getOsEnv('LOG_FORMAT'),
    level: getOsEnv('LOG_LEVEL'),
  },
  core: {
    port: getOsEnv('PORT'),
  },
  db: {
    username: getOsEnv('DB_USERNAME'),
    password: getOsEnv('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
    host: getOsEnv('DB_HOST'),
    dialect: getOsEnv('DB_DIALECT'),
    port: getOsEnv('DB_PORT'),
  },
  config: {
    enableSnakeCase: getOsEnv('SNAKE_CASE') === 'true',
  },
  auth: {
    jwtSecret: getOsEnv('JWT_SECRET'),
    expiresIn: getOsEnv('JWT_EXPIRES'),
  },
  cache: {
    type: getOsEnv('CACHE_TYPE'),
    redis: {
      host: getOsEnv('REDIS_HOST'),
      password: getOsEnvOptional('REDIS_PASSWORD'),
      username: getOsEnvOptional('REDIS_USERNAME'),
      port: getOsEnv('REDIS_PORT'),
    },
  },
  upload: {
    type: getOsEnv('UPLOAD_TYPE'),
    disksDir: getOsEnv('DISKS_DIR') || '/public/uploads',
  },
  RabbitMq: {
    url: getOsEnv('RMQ_URL'),
    port: getOsEnv('RMQ_PORT'),
    ordersQueue: getOsEnv('RMQ_ORDERS_QUEUE'),
  },
};

export { env };
