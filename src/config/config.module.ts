// Core Packages
import { Module } from '@nestjs/common';

// Custom Packages
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        // `${process.env.NODE_ENV || 'development'}.env`,
        '.env',
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
