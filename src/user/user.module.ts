import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
