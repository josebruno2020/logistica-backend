import { ShippingResult } from 'src/domain/entities/shipping-result.entity';

export class BaseShippingUseCase {
  public getCheaperResult(results: ShippingResult[]): ShippingResult | null {
    if (!results.length) {
      return null;
    }

    return results.reduce((cheaper, current) => {
      return current.totalCost < cheaper.totalCost ? current : cheaper;
    });
  }

  public getFasterResult(results: ShippingResult[]): ShippingResult | null {
    if (!results.length) {
      return null;
    }

    return results.reduce((faster, current) => {
      return current.deliveryTime < faster.deliveryTime ? current : faster;
    });
  }
}
