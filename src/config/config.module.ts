// Core Packages
import { Module } from '@nestjs/common';

// Custom Packages
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService( // set environment file path
        // `${process.env.NODE_ENV || 'development'}.env`,
        '.env',
      ),
    },
  ],
  exports: [ConfigService], // export so that it can be used in other modules
})
export class ConfigModule {}
