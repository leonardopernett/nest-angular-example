import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { Logger } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev'))
  app.useStaticAssets(resolve('./public'))
  app.setGlobalPrefix('api')
  app.enableCors()
  const logger = new Logger()
  await app.listen(3000);
  logger.log('🚨 Server Startup 🚀 On Port 3000')
}
main();
