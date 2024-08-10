import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { Product } from 'src/domain/entities/product.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';

export class CreateShippingResultDto {
  @ApiProperty({ type: Shipping })
  @IsNotEmptyObject()
  shipping: Shipping;

  @ApiProperty({ type: Product })
  @IsNotEmptyObject()
  product: Product;
}
