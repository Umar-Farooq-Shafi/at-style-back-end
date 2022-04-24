import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
