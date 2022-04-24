import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') // inject user model
    private userMode: Model<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userMode(createUserDto);
    return user.save(); // save user to database
  }

  // find users
  async findAll(): Promise<User[]> {
    return this.userMode.find().exec();
  }

  // find user by id
  async findOne(id: Types.ObjectId): Promise<User> {
    // handling the given id is not a valid ObjectId
    try {
      const user: User | null = await this.userMode.findById(id).exec();

      // if user is not found
      if (user === null) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (e: any) {
      throw new BadRequestException(e.message); // throw bad request exception
    }
  }

  async update(id: Types.ObjectId, user: UpdateUserDto): Promise<User> {
    try {
      const updatedUser: User | null = await this.userMode
        .findByIdAndUpdate(id, user, { new: true })
        .exec();
      if (updatedUser === null) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  async delete(id: Types.ObjectId): Promise<void> {
    try {
      const deletedUser: User | null = await this.userMode
        .findByIdAndDelete(id, { new: true })
        .exec();
      if (deletedUser === null) {
        throw new NotFoundException('User not found');
      }
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }
}
