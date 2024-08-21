import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.service';

@Module({
  imports: [],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
