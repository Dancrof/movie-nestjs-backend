/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './product/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TYPEORM_CONFIG } from 'src/config/constant';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    // Conecion a BD
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => 
      config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
      
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [databaseConfig],
    }),
    MovieModule, 
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
