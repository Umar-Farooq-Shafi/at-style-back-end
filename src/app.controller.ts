import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { User } from './user/interface/user.interface';
import { AuthService } from './auth/auth.service';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<User> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any): any {
    return req.user;
  }
}
