import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/domain/entities/product.entity';

export class ProductPresenter {
  @ApiProperty({ example: '7ce225ea-906c-4ebf-818a-172124c99531' })
  id: string;

  @ApiProperty({ example: 15.5 })
  height: number;

  @ApiProperty({ example: 15.5 })
  width: number;

  @ApiProperty({ example: 15.5 })
  length: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({ id, height, width, length, createdAt, updatedAt }: Product) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.length = length;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
