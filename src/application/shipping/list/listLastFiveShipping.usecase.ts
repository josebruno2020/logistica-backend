import { Inject } from '@nestjs/common';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { IListLastFiveShippingUseCase } from 'src/domain/usecases/shipping/listLastFiveShipping.usecase';
import { ShippingResponseDto } from 'src/presentation/shipping/dtos/create-shipping-response.dto';

export class ListLastFiveShippingUseCase
  implements IListLastFiveShippingUseCase
{
  constructor(
    @Inject(IShippingRepository)
    private readonly shippingRepository: IShippingRepository,
    @Inject(IShippingResultRepository)
    private readonly shippingResultRepository: IShippingResultRepository,
  ) {}

  async execute(): Promise<ShippingResponseDto[]> {
    const shippings = await this.shippingRepository.listLastFive();
    return await Promise.all(
      shippings.map(async (shipping) => {
        const cheaperOperator =
          await this.shippingResultRepository.getCheaperByShippingId(
            shipping.id,
          );
        const fasterOperator =
          await this.shippingResultRepository.getFasterByShippingId(
            shipping.id,
          );
        return {
          shipping,
          fasterOperator,
          cheaperOperator,
        };
      }),
    );
  }
}
