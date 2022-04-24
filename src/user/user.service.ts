import { Model, ObjectId } from 'mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

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

  async findOne(id: ObjectId): Promise<User> {
    const user: User | null = await this.userMode.findById(id).exec();
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: ObjectId, user: UpdateUserDto): Promise<User> {
    const updatedUser: User | null = await this.userMode
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    if (updatedUser === null) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async delete(id: ObjectId): Promise<void> {
    const deletedUser: User | null = await this.userMode
      .findByIdAndDelete(id, { new: true })
      .exec();
    if (deletedUser === null) {
      throw new NotFoundException('User not found');
    }
  }
}
