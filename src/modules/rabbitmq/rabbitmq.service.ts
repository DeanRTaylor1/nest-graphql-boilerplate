import fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  @MessagePattern('order_queue')
  public async processOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    Logger.log('Received');
    console.log(data, context);

    // Define the file path
    const filePath = 'data.txt';

    // Serialize the data to JSON (if needed)
    const serializedData = JSON.stringify(data);

    // Write the data to the file
    fs.writeFileSync(filePath, serializedData);

    Logger.log(`Data written to ${filePath}`);
  }

  @EventPattern('order-queue')
  public async processOrders(@Payload() data: any, @Ctx() context: RmqContext) {
    Logger.log('Received');
    console.log(data, context);

    // Define the file path
    const filePath = 'data.txt';

    // Serialize the data to JSON (if needed)
    const serializedData = JSON.stringify(data);

    // Write the data to the file
    fs.writeFileSync(filePath, serializedData);

    Logger.log(`Data written to ${filePath}`);
  }
}
