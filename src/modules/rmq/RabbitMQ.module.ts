import { Module, OnModuleInit, Injectable, Logger } from '@nestjs/common';

import { RabbitMQService } from './RabbitMQ.service';

@Module({
  providers: [RabbitMQService, Logger],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
