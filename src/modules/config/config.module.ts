import { Global, Module } from '@nestjs/common';
import { env } from './env';

@Global()
@Module({
  providers: [
    {
      provide: 'AppConfig',
      useValue: env,
    },
  ],
  exports: ['AppConfig'],
})
export class ConfigModule {}
