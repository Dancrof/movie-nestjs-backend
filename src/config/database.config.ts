/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PORT, 10),
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,
  
    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
    migrationsRun: true,
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
       migrationsDir: 'src/migration',
      },
  
    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: true,
    logging: true,
    logger: 'file',

  }
}

export default registerAs('database', () => ({
  config: typeormModuleOptions()
}));