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
  UsePipes,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcrypt';

import { Observable, of } from 'rxjs';

// services
import { UserService } from './../user.service';

// interfaces
import { User } from './../interface/user.interface';

// dtos
import { CreateUserDto, UpdateUserDto } from './../dto/user.dto';

// pipes
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
import { ParseObjectPipe } from 'src/pipes/objectid.pipe';

import { Public } from '../../decorators/public.decorator';

// validate user request
const createUserSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  gender: Joi.string().valid('male', 'female').required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.ref('password'),
  phone: Joi.number().required(),
  referralCode: Joi.string(),
});

// api endpoint: /api/user
@Controller('/api/user')
export class UserController {
  // inject user service
  constructor(private userService: UserService) {}

  // [POST] api endpoint: /api/user
  @Post()
  @Header('Cache-Control', 'none')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @Public()
  async create(@Body() user: CreateUserDto): Promise<HttpStatus> {
    const userExists = await this.userService.checkUserExists(user.name);
    if (userExists) {
      return HttpStatus.CONFLICT; // 409
    }

    const salt = await bcrypt.genSalt(); // generate salt
    const hash = await bcrypt.hash(user.password, salt); // hash the password
    user.password = hash; // set the password to the hash

    await this.userService.create(user);
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
  async findOne(
    @Param('id', new ParseObjectPipe()) id: Types.ObjectId,
  ): Promise<User> {
    // return the user with the given id
    return this.userService.findOne(id);
  }

  // [PUT] api endpoint: /api/user/:id
  @Put(':id')
  async update(
    @Param('id', new ParseObjectPipe()) id: Types.ObjectId,
    @Body() user: UpdateUserDto, // update user request
  ): Promise<User> {
    user.updatedAt = new Date(); // update updatedAt

    // return the updated user
    return this.userService.update(id, user);
  }

  // [DELETE] api endpoint: /api/user/:id
  @Delete(':id')
  async delete(
    @Param('id', new ParseObjectPipe()) id: Types.ObjectId,
  ): Promise<HttpStatus> {
    // delete the user with the given id
    await this.userService.delete(id);
    return HttpStatus.NO_CONTENT; // 204
  }
}
