import { Inject } from '@nestjs/common';
import { IDistance } from 'src/domain/adapters/distance.adapter';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { ICreateAddressUseCase } from 'src/domain/usecases/address/createAddress.usecase';
import { ICreateProductUseCase } from 'src/domain/usecases/product/createProduct.usecase';
import { ICreateShippingUseCase } from 'src/domain/usecases/shipping/createShipping.usecase';
import { ICreateShippingResultUseCase } from 'src/domain/usecases/shipping/createShippingResult.usecase';
import { ShippingResponseDto } from 'src/presentation/shipping/dtos/create-shipping-response.dto';
import { CreateShippingDto } from 'src/presentation/shipping/dtos/create-shipping.dto';

export class CreateShippingUseCase implements ICreateShippingUseCase {
  constructor(
    @Inject(ICreateAddressUseCase)
    private readonly createAddressUseCase: ICreateAddressUseCase,
    @Inject(ICreateProductUseCase)
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject(IDistance)
    private readonly distanceAdapter: IDistance,
    @Inject(IShippingRepository)
    private readonly shippingRepository: IShippingRepository,
    @Inject(ICreateShippingResultUseCase)
    private readonly createShippingResultUseCase: ICreateShippingResultUseCase,
  ) {}

  async execute({
    collectionAddress: collectionAddressDto,
    deliveryAddress: deliveryAddressDto,
    product: productDto,
  }: CreateShippingDto): Promise<ShippingResponseDto> {
    const collectionAddress =
      await this.createAddressUseCase.execute(collectionAddressDto);
    const deliveryAddress =
      await this.createAddressUseCase.execute(deliveryAddressDto);

    const product = await this.createProductUseCase.execute(productDto);

    const { distance } =
      await this.distanceAdapter.calculateDistanceInKmBetweenAddresses(
        collectionAddress,
        deliveryAddress,
      );

    const shipping = new Shipping();
    shipping.collectionAddress = collectionAddress;
    shipping.deliveryAddress = deliveryAddress;
    shipping.product = product;
    shipping.distance = distance;

    const shippingCreated =
      await this.shippingRepository.createEntity(shipping);

    const { cheaperOperator, fasterOperator } =
      await this.createShippingResultUseCase.execute({
        shipping,
        product,
      });

    return {
      shipping: shippingCreated,
      cheaperOperator,
      fasterOperator,
    };
  }
}
