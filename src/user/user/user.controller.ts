import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { Observable, of } from 'rxjs';

import { UserService } from './../user.service';
import { User } from './../interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './../dto/user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() user: CreateUserDto): Promise<HttpStatus> {
    await this.userService.create(user);
    return HttpStatus.CREATED;
  }

  @Get()
  findAll(): Observable<Promise<User[]>> {
    return of(this.userService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId): Promise<HttpStatus> {
    await this.userService.delete(id);
    return HttpStatus.NO_CONTENT;
  }

  // @All()
  // async notFound() {
  //   throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  // }
}
