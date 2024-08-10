import { Module } from '@nestjs/common';
import { AddressModule } from 'src/application/address/address.module';
import { ProductModule } from 'src/application/product/product.module';

@Module({
  imports: [AddressModule, ProductModule],
})
export class PresentationModule {}
