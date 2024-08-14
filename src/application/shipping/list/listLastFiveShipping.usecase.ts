import { Inject } from '@nestjs/common';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { IListLastFiveShippingUseCase } from 'src/domain/usecases/shipping/listLastFiveShipping.usecase';
import { ShippingResponseDto } from 'src/presentation/shipping/dtos/create-shipping-response.dto';
import { BaseShippingUseCase } from '../shipping.usecase';

export class ListLastFiveShippingUseCase
  extends BaseShippingUseCase
  implements IListLastFiveShippingUseCase
{
  constructor(
    @Inject(IShippingRepository)
    private readonly shippingRepository: IShippingRepository,
    @Inject(IShippingResultRepository)
    private readonly shippingResultRepository: IShippingResultRepository,
  ) {
    super();
  }

  async execute(): Promise<ShippingResponseDto[]> {
    const shippings = await this.shippingRepository.listLastFive();
    return await Promise.all(
      shippings.map(async (shipping) => {
        const results = await this.shippingResultRepository.listByShippingId(
          shipping.id,
        );
        return {
          shipping,
          fasterOperator: this.getFasterResult(results),
          cheaperOperator: this.getCheaperResult(results),
        };
      }),
    );
  }
}
