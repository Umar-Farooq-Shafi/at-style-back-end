import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';

import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel')
    private userMode: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userMode(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userMode.find().exec();
  }
}
