import { Operator } from './operator.entity';
import { Product } from './product.entity';

describe('OperatorEntity', () => {
  let operator: Operator;
  beforeEach(() => {
    operator = new Operator();
    operator.cubicFactor = 6000;
    operator.lessHundred = 1.2;
    operator.hundredToFiveHundred = 1.6;
    operator.moreFiveHundred = 5;

    operator.deliveryTimeLessHundred = 1;
    operator.deliveryTimeHundredToFiveHundred = 2;
    operator.deliveryTimeMoreFiveHundred = 5;
  });
  it('should calculate cubic value successfully', () => {
    const product = Object.assign(new Product(), {
      height: 200,
      width: 150,
      length: 500.5,
    });
    const cubicValue = operator.calculationOperatorCubicValue(product);

    const expectedCubicValue = 2502.5;

    expect(cubicValue).toEqual(expectedCubicValue);
  });

  it('should calculate total cost successfully with distance less than 100', () => {
    const distance = 5;
    const cubicValue = 2502.5;
    const totalCost = operator.calculationTotalCost(distance, cubicValue);

    const expectedTotalCost = 3003;

    expect(totalCost).toEqual(expectedTotalCost);
  });

  it('should calculate total cost successfully with distance less than 500', () => {
    const distance = 150;
    const cubicValue = 2502.5;
    const totalCost = operator.calculationTotalCost(distance, cubicValue);

    const expectedTotalCost = 4004;

    expect(totalCost).toEqual(expectedTotalCost);
  });

  it('should calculate total cost successfully with distance more than 500', () => {
    const distance = 550;
    const cubicValue = 2502.5;
    const totalCost = operator.calculationTotalCost(distance, cubicValue);

    const expectedTotalCost = 12512.5;

    expect(totalCost).toEqual(expectedTotalCost);
  });

  it('should calculate total delivery time with distance less than 100', () => {
    const distance = 5;

    const deliveryTime = operator.calculationTotalDeliveryTimeInDays(distance);

    const expectedDeliveryTime = 1;
    expect(deliveryTime).toEqual(expectedDeliveryTime);
  });

  it('should calculate total delivery time with distance less than 500', () => {
    const distance = 150;

    const deliveryTime = operator.calculationTotalDeliveryTimeInDays(distance);

    const expectedDeliveryTime = 2;
    expect(deliveryTime).toEqual(expectedDeliveryTime);
  });

  it('should calculate total delivery time with distance more than 500', () => {
    const distance = 600;

    const deliveryTime = operator.calculationTotalDeliveryTimeInDays(distance);

    const expectedDeliveryTime = 5;
    expect(deliveryTime).toEqual(expectedDeliveryTime);
  });
});
