import { Injectable } from '@nestjs/common';
import { KafkaConsumerService } from 'src/consumer/kafka.service';

@Injectable()
export class RidebookService {
  private rides = new Map<number, number>([
    [1, 10],
    [2, 5],
    [3, 0],
  ]);

  constructor(private readonly kafkaService: KafkaConsumerService) {}

  async listenForBookingMessages() {
    await this.kafkaService.createConsumer(
      'ride-group',
      ['booking-topic'],
      this.handleBookingMessage.bind(this),
    );
  }

  async handleBookingMessage(booking: any) {
    const availableSlots = this.rides.get(booking.rideId) || 0;

    if (availableSlots >= booking.slots) {
      this.rides.set(booking.rideId, availableSlots - booking.slots);
      console.log(
        `Ride booking confirmed: ${booking.slots} slots for Ride ID ${booking.rideId} booked.`,
      );

      await this.kafkaService.sendMessage('payment-topic', {
        bookingId: booking.id,
        userId: booking.userId,
        rideId: booking.rideId,
        slots: booking.slots,
        amount: booking.amount,
      });
    } else {
      console.log(`Not enough slots for Ride ID ${booking.rideId}.`);

      await this.kafkaService.sendMessage('notification-topic', {
        bookingId: booking.id,
        userId: booking.userId,
        rideId: booking.rideId,
        status: 'Out of Slots',
      });
    }
  }
}
