import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';

export class CreateShippingDto {
  @ApiProperty({ type: CreateProductDto })
  @IsNotEmptyObject()
  @ValidateNested()
  product: CreateProductDto;

  @ApiProperty({ type: CreateAddressDto })
  @IsNotEmptyObject()
  @ValidateNested()
  collectionAddress: CreateAddressDto;

  @ApiProperty({ type: CreateAddressDto })
  @IsNotEmptyObject()
  @ValidateNested()
  deliveryAddress: CreateAddressDto;
}
