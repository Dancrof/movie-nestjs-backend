/* eslint-disable prettier/prettier */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constant';
import generateTypeormConfigFile from './config/generate-typeorm-config-files';

//segurity
import * as helmet from 'helmet';
//import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = app.get(ConfigService);
  
  initSwagger(app);
  generateTypeormConfigFile(config);
  
  app.use(helmet());
  //app.use(csurf());

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = config.get<number>(SERVER_PORT) || 3000;
  
  const logger = new Logger();
  await app.listen(port);
  logger.log(`Server is runing is ${await app.getUrl()}`);
}
bootstrap();
