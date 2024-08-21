import { Module, OnModuleInit } from '@nestjs/common';
import { KafkaModule } from 'src/consumer/kafka.module';
import { PaymentService } from './payment.service';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Module({
  imports: [KafkaModule],
  providers: [PaymentService, KafkaConsumerService],
})
export class PaymentModule implements OnModuleInit {
  constructor(private readonly paymentService: PaymentService) {}

  async onModuleInit() {
    await this.paymentService.payment();
  }
}
