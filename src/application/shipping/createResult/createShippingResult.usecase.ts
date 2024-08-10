import { Inject } from '@nestjs/common';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { IOperatorRepository } from 'src/domain/repositories/operator.repository';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { ICreateShippingResultUseCase } from 'src/domain/usecases/shipping/createShippingResult.usecase';
import { CreateShippingResultResponse } from 'src/presentation/shipping/dtos/create-shipping-result-response.dto';
import { CreateShippingResultDto } from 'src/presentation/shipping/dtos/create-shipping-result.dto';

export class CreateShippingResultUseCase
  implements ICreateShippingResultUseCase
{
  constructor(
    @Inject(IOperatorRepository)
    private readonly operatorRepository: IOperatorRepository,
    @Inject(IShippingResultRepository)
    private readonly shippingResultRepository: IShippingResultRepository,
  ) {}

  async execute({
    shipping,
    product,
  }: CreateShippingResultDto): Promise<CreateShippingResultResponse> {
    const operators = await this.operatorRepository.listAll();
    const results: ShippingResult[] = [];
    const { distance } = shipping;
    for await (const operator of operators) {
      const cubicValue = operator.calculationOperatorCubicValue(product);
      const totalOperatorCost = operator.calculationTotalCost(
        distance,
        cubicValue,
      );
      const deliveryOperatorTime =
        operator.calculationTotalDeliveryTimeInDays(distance);

      const shippingResult = new ShippingResult();
      shippingResult.operator = operator;
      shippingResult.shipping = shipping;
      shippingResult.totalCost = totalOperatorCost;
      shippingResult.deliveryTime = deliveryOperatorTime;

      const createdShippingResult =
        await this.shippingResultRepository.createEntity(shippingResult);
      results.push(createdShippingResult);
    }

    return {
      fasterOperator: this.getFasterResult(results),
      cheaperOperator: this.getCheaperResult(results),
    };
  }

  private getCheaperResult(results: ShippingResult[]): ShippingResult | null {
    if (!results.length) {
      return null;
    }

    return results.reduce((cheaper, current) => {
      return current.totalCost < cheaper.totalCost ? current : cheaper;
    });
  }

  private getFasterResult(results: ShippingResult[]): ShippingResult | null {
    if (!results.length) {
      return null;
    }

    return results.reduce((faster, current) => {
      return current.deliveryTime < faster.deliveryTime ? current : faster;
    });
  }
}
