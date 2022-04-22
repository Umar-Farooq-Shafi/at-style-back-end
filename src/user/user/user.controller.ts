import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable, of } from 'rxjs';

@Controller('/api/user')
export class UserController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new user';
  }

  @Get()
  findAll(@Req() request: Request): Observable<string> {
    console.log(request.headers);
    return of('This action returns all users');
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} user`;
  }
}
