import { Module } from '@nestjs/common';
import { ShippingModule } from 'src/application/shipping/shipping.module';
import { ShippingController } from './shipping/shipping.controller';

@Module({
  imports: [ShippingModule],
  controllers: [ShippingController],
})
export class PresentationModule {}
