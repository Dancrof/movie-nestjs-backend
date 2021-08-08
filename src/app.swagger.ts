/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {

    const config = new DocumentBuilder()
    .setTitle('Api Res Movie')
    .addBearerAuth()
    .setDescription('Api con metodos CRUD, Auth, para Movie')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
}