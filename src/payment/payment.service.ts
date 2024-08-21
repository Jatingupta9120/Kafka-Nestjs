import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly kafkaService: KafkaConsumerService) {}

  // async processPaymentMessage(message: KafkaMessage) {
  //   const { value } = message;
  //   try {
  //     const paymentDetails = JSON.parse(value.toString());
  //     this.logger.log(
  //       `Received payment message: ${JSON.stringify(paymentDetails)}`,
  //     );
  //     this.logger.log(
  //       `Processing payment for amount: ${paymentDetails.amount} ${paymentDetails.currency}`,
  //     );
  //   } catch (error) {
  //     this.logger.error('Failed to process payment message', error.stack);
  //   }
  // }
  // async notifyUser(rideDetails: any) {
  //   console.log('Notifying user with ride details:', rideDetails);
  // }
  async payment() {
    await this.kafkaService.createConsumer(
      'payment-group',
      ['payment-topic'],
      this.statusPayment.bind(this),
    );
  }

  async statusPayment() {
    console.log('Payment successful ');
  }
}
