import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: '87060-100' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({ example: 'PR' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: 'Maringá' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'Zona 05' })
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty({ example: 'Rua dos Alecrins' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: '555' })
  @IsNotEmpty()
  @IsString()
  number: string;
}
