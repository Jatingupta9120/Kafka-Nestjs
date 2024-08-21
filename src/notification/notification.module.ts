import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/consumer/kafka.module';
import { NotificationService } from './notification.service';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Module({
  imports: [KafkaModule],
  providers: [NotificationService, KafkaConsumerService],
})
export class NotificationModule {}
