import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationModule } from './notification/notification.module';
// import { BookRideModule } from './ride-booking/ride.module';
import { InventoryModule } from './inventory/inventory.module';
import { PaymentModule } from './payment/payment.module';
import { RideBookModule } from './ride-booking/ride.module';

@Module({
  imports: [RideBookModule, NotificationModule, PaymentModule, InventoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
