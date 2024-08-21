import { Module } from '@nestjs/common';
import { RideBookingController } from './ride.controller';
import { BookRidingService } from './ride.service';
import { KafkaModule } from 'src/consumer/kafka.module';
import { Kafka } from 'kafkajs';
import { KafkaConsumerService } from 'src/consumer/kafka.service';
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer();
@Module({
  imports: [KafkaModule],
  controllers: [RideBookingController],
  providers: [
    BookRidingService,
    KafkaConsumerService,
    {
      provide: 'KAFKA_SERVICE',
      useFactory: async () => {
        await producer.connect();
        return producer;
      },
    },
  ],
  exports: ['KAFKA_SERVICE'],
})
export class RideBookModule {}
