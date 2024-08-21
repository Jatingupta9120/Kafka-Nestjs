
import { Injectable } from '@nestjs/common';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Injectable()
export class NotificationService {
  constructor(private readonly kafkaService: KafkaConsumerService) {}
  async onModuleInit() {
    await this.notify();
  }
  async notify() {
    await this.kafkaService.createConsumer(
      'notification-group',
      ['notification-topic'],

      this.notification.bind(this),
    );
  }

  async notification() {
    console.log('Booked Successfully');
  }
}
