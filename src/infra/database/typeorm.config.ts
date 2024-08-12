import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const config: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schema: process.env.DB_DEFAULT_SCHEMA,
  entities: ['src/domain/**/*.entity.ts'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/infra/database/migrations/*.ts'],
  seeds: ['src/infra/database/seeds/*.ts'],
};

const d = new DataSource(config);

d.initialize()
  .then((r) => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default d;
