import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Operator } from '../../../domain/entities/operator.entity';

export default class OperatorSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Operator);
    await repository.insert([
      {
        name: 'Operador Logístico 1',
        cubicFactor: 6000,
        lessHundred: 1.2,
        hundredToFiveHundred: 1.6,
        moreFiveHundred: 5,
        deliveryTimeLessHundred: 1,
        deliveryTimeHundredToFiveHundred: 3,
        deliveryTimeMoreFiveHundred: 4,
      },
      {
        name: 'Operador Logístico 2',
        cubicFactor: 5000,
        lessHundred: 1,
        hundredToFiveHundred: 1.8,
        moreFiveHundred: 4,
        deliveryTimeLessHundred: 1,
        deliveryTimeHundredToFiveHundred: 2,
        deliveryTimeMoreFiveHundred: 5,
      },
    ]);
    console.log('Dados OperatorSeed inseridos com sucesso!');
  }
}
