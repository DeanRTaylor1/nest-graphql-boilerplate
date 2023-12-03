import { Injectable, Logger } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

import { env } from '@modules/config/env';

@Injectable()
export class RabbitMQService {
  private channel: Channel;
  private connection: Connection;

  constructor(private readonly logger: Logger) {
    this.init().then(() => {
      console.log(
        'Connected to ' +
          env.RabbitMq.url +
          ' ' +
          'Queue: ' +
          env.RabbitMq.ordersQueue,
      );
    });
  }

  async init() {
    //test
    try {
      this.connection = await connect(env.RabbitMq.url);
      console.log(env.RabbitMq.url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(env.RabbitMq.ordersQueue, {
        durable: true,
      });
      this.processMessages();
    } catch (error) {
      this.logger.error('Failed to initialize RabbitMQ:', error);
    }
  }

  async sendMessage(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async processMessages() {
    this.channel.consume(env.RabbitMq.ordersQueue, (message) => {
      if (message) {
        console.log(JSON.parse(message.content.toString()));
        const content = message.content.toString();
        this.logger.debug('Received:', content);

        this.channel.ack(message);
      }
    });
  }
}
