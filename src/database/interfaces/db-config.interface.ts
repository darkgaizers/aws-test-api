import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

export interface IDatabaseConfigDefine {
  underscored: boolean
}

export interface IDatabaseDefaultConfig {
  username: string,
  password: string,
  host: string,
  port: number,
  dialect: Dialect,
  define: IDatabaseConfigDefine
}

export interface IDatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}
