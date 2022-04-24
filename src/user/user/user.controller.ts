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
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as Joi from '@hapi/joi';

import { Observable, of } from 'rxjs';

import { UserService } from './../user.service';
import { User } from './../interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './../dto/user.dto';

// api endpoint: /api/user
@Controller('/api/user')
export class UserController {
  // inject user service
  constructor(private userService: UserService) {}

  // [POST] api endpoint: /api/user
  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() user: CreateUserDto): Promise<HttpStatus> {
    // validate user request
    const createUserSchema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      gender: Joi.string().valid('male', 'female').required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      repeatPassword: Joi.ref('password'),
      phone: Joi.number().required(),
      referralCode: Joi.string(),
    });

    const { error, value: validatedUser } = createUserSchema.validate(user);

    // if validation fails
    if (error) {
      throw new BadRequestException(error.message);
    }

    // if validation passes, create user
    await this.userService.create(validatedUser);
    return HttpStatus.CREATED; // 201
  }

  // [GET] api endpoint: /api/user
  @Get()
  findAll(): Observable<Promise<User[]>> {
    // return the users
    return of(this.userService.findAll());
  }

  // [GET] api endpoint: /api/user/:id
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId): Promise<User> {
    // return the user with the given id
    return this.userService.findOne(id);
  }

  // [PUT] api endpoint: /api/user/:id
  @Put(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() user: UpdateUserDto, // update user request
  ): Promise<User> {
    user.updatedAt = new Date(); // update updatedAt

    // return the updated user
    return this.userService.update(id, user);
  }

  // [DELETE] api endpoint: /api/user/:id
  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId): Promise<HttpStatus> {
    // delete the user with the given id
    await this.userService.delete(id);
    return HttpStatus.NO_CONTENT; // 204
  }
}
