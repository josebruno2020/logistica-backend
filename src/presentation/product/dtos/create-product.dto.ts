import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 15.5 })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({ example: 10.0 })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({ example: 12.5 })
  @IsNumber()
  @IsNotEmpty()
  length: number;
}
