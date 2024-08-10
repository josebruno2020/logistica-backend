import { ApiProperty } from '@nestjs/swagger';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { AddressPresenter } from 'src/presentation/address/presenters/address.presenter';
import { ProductPresenter } from 'src/presentation/product/presenters/product.presenter';

export class ShippingPresenter {
  @ApiProperty({ example: '7ce225ea-906c-4ebf-818a-172124c99531' })
  id: string;

  @ApiProperty({ type: ProductPresenter })
  product: ProductPresenter;

  @ApiProperty({ type: AddressPresenter })
  collectionAddress: AddressPresenter;

  @ApiProperty({ type: AddressPresenter })
  deliveryAddress: AddressPresenter;

  @ApiProperty({ example: 750 })
  distance: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    id,
    product,
    collectionAddress,
    deliveryAddress,
    distance,
    createdAt,
    updatedAt,
  }: Shipping) {
    this.id = id;
    this.product = new ProductPresenter(product);
    this.collectionAddress = new AddressPresenter(collectionAddress);
    this.deliveryAddress = new AddressPresenter(deliveryAddress);
    this.distance = distance;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
