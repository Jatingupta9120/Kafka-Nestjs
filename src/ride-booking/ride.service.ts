import { Inject, Injectable, Logger } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Injectable()
export class BookRidingService {
  private readonly logger = new Logger(BookRidingService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly producer: Producer,
    private readonly kafkaService: KafkaConsumerService,
  ) {}

  async bookRide(key: string, rideDetails: any) {
    const data = await this.producer.send({
      topic: 'payment-topic',
      messages: [
        {
          value: JSON.stringify({
            amount: rideDetails.amount,
            currency: 'INR',
            source: rideDetails.paymentSource,
          }),
        },
      ],
    });

    await this.kafkaService.sendMessage('my-topic', data);
    this.logger.log(
      `Ride booked and payment request sent for ride details: ${JSON.stringify(rideDetails)}`,
    );
  }
}
