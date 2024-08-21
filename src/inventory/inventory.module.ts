import { Module, OnModuleInit } from '@nestjs/common';
import { KafkaModule } from 'src/consumer/kafka.module';
import { RidebookService } from './rideBook.service';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Module({
  imports: [KafkaModule],
  providers: [RidebookService, KafkaConsumerService],
})
export class InventoryModule implements OnModuleInit {
  constructor(private readonly inventoryService: RidebookService) {}

  async onModuleInit() {
    await this.inventoryService.listenForBookingMessages();
  }
}
