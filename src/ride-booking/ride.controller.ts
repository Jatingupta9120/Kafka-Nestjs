import { Body, Controller, Logger, Post } from '@nestjs/common';
import { rideDetailsDto } from './ride.dto';
import { BookRidingService } from './ride.service';

@Controller('rides')
export class RideBookingController {
  private readonly logger = new Logger(RideBookingController.name);

  constructor(private readonly bookRidingService: BookRidingService) {}

  @Post('book')
  async bookRide(@Body() bookRideDto: rideDetailsDto) {
    try {
      await this.bookRidingService.bookRide('booking-topic', bookRideDto);
      return {
        message: 'Ride booked successfully, and payment request sent.',
      };
    } catch (error) {
      this.logger.error('Failed to book ride', error.stack);
      throw new Error(`Failed to book ride: ${error.message}`);
    }
  }
}
