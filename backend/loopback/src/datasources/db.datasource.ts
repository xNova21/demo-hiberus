
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import path from 'path';

const postgresConfig = {
  name: 'db',
  connector: 'postgresql',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? 'user',
  password: process.env.DB_PASSWORD ?? 'pass',
  database: process.env.DB_NAME ?? 'notesdb',
};

const memoryConfig = {
  name: 'db',
  connector: 'memory',
  localStorage: '',
  file: path.resolve(process.cwd(), 'src/data/db.json'),
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig =
    process.env.USE_POSTGRES === 'true' ? postgresConfig : memoryConfig;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = DbDataSource.defaultConfig,
  ) {
    super(dsConfig);
  }
}
