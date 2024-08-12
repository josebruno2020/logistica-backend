import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitMigration1723466851758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'postalCode',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'lat',
            type: 'decimal',
            precision: 10,
            scale: 8,
          },
          {
            name: 'long',
            type: 'decimal',
            precision: 11,
            scale: 8,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'operators',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'cubicFactor',
            type: 'bigint',
          },
          {
            name: 'lessHundred',
            type: 'decimal',
          },
          {
            name: 'hundredToFiveHundred',
            type: 'decimal',
          },
          {
            name: 'moreFiveHundred',
            type: 'decimal',
          },
          {
            name: 'deliveryTimeLessHundred',
            type: 'integer',
          },
          {
            name: 'deliveryTimeHundredToFiveHundred',
            type: 'integer',
          },
          {
            name: 'deliveryTimeMoreFiveHundred',
            type: 'integer',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'height',
            type: 'decimal',
          },
          {
            name: 'width',
            type: 'decimal',
          },
          {
            name: 'length',
            type: 'decimal',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'shippings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'productId',
            type: 'uuid',
          },
          {
            name: 'collectionAddressId',
            type: 'uuid',
          },
          {
            name: 'deliveryAddressId',
            type: 'uuid',
          },
          {
            name: 'distance',
            type: 'decimal',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'shippings',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shippings',
      new TableForeignKey({
        columnNames: ['collectionAddressId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shippings',
      new TableForeignKey({
        columnNames: ['deliveryAddressId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'shipping_result',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'shippingId',
            type: 'uuid',
          },
          {
            name: 'operatorId',
            type: 'uuid',
          },
          {
            name: 'totalCost',
            type: 'decimal',
          },
          {
            name: 'deliveryTime',
            type: 'integer',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'shipping_result',
      new TableForeignKey({
        columnNames: ['shippingId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shippings',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shipping_result',
      new TableForeignKey({
        columnNames: ['operatorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operators',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipping_result');
    await queryRunner.dropTable('shippings');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('operators');
    await queryRunner.dropTable('addresses');
  }
}
