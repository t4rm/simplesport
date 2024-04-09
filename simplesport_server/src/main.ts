import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { ServerConfig } from './app.types';

async function bootstrap(config: ServerConfig) {
  console.log('config', config)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.listen(config.port, config.host);
  Logger.log(
    `SimpleSport API est disponible : http://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(Config.get<ServerConfig>('server'));