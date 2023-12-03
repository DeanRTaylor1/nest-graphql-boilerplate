import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

import { env } from '@modules/config/env';

import { AppModule } from './app.module';
import { TerminalEscapeCodes } from './utils/color.util';
import { RabbitMQModule } from '@modules/rmq/RabbitMQ.module';

class NestApp {
  private app: INestApplication;
  public port: string | number = process.env.PORT || 3000;
  private readonly globalPrefix = 'api/v1';

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    const logDir: string = join(__dirname, env.logs.logDir);
    console.log({ logDir });

    if (!existsSync(logDir)) {
      mkdirSync(logDir);
    }

    const logFormat = winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
    );
    this.app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss',
          }),
          logFormat,
        ),
        transports: [
          new winston.transports.Console({
            level: 'debug',
          }),
          new winstonDaily({
            level: 'debug',
            datePattern: 'DD-MM-YYYY',
            dirname: logDir + '/debug',
            filename: '%DATE%.log',
            maxFiles: 30,
            json: false,
            zippedArchive: true,
          }),
          new winstonDaily({
            level: 'error',
            datePattern: 'DD-MM-YYYY',
            dirname: logDir + '/error',
            filename: '%DATE%.log',
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true,
          }),
        ],
      }),
    });

    this.app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:15672'],
        queue: env.RabbitMq.ordersQueue,
        queueOptions: {
          durable: false,
        },
      },
    });

    this.registerMiddleware();
    // this.app.startAllMicroservices();
    this.listen();
  }

  private registerMiddleware() {
    this.app.enableCors();
    this.app.setGlobalPrefix(this.globalPrefix);
  }

  private async listen() {
    await this.app.listen(this.port);
    const art = `
    ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
    ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ 
    ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  
    ██║  ██║███████╗██║  ██║██████╔╝   ██║   
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝
  `;
    Logger.log(
      `${TerminalEscapeCodes.FgGreen}${art}${TerminalEscapeCodes.Reset}`,
    );
    Logger.log(
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    );
    Logger.log(
      `         ${TerminalEscapeCodes.FgWhite}${TerminalEscapeCodes.BgGreen}🚀 Application is running on: http://localhost:${this.port}/${this.globalPrefix}.${TerminalEscapeCodes.Reset}`,
    );
    Logger.log('');
    Logger.log(
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    );
  }
}

new NestApp();
