import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 15.5 })
  @IsNotEmpty()
  height: number;

  @ApiProperty({ example: 10.0 })
  @IsNotEmpty()
  width: number;

  @ApiProperty({ example: 12.5 })
  @IsNotEmpty()
  length: number;
}
