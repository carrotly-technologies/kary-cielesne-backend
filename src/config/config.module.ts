import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { DatabaseConfig } from './database.config';
import { ServerConfig } from './server.config';
import { validate } from './env.variables';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [DatabaseConfig, ServerConfig],
  exports: [DatabaseConfig, ServerConfig],
})
export class ConfigModule {}
