import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';

export class CreateShippingDto {
  @ApiProperty({ type: CreateProductDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @ApiProperty({ type: CreateAddressDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  collectionAddress: CreateAddressDto;

  @ApiProperty({ type: CreateAddressDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  deliveryAddress: CreateAddressDto;
}
