import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, UserModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
