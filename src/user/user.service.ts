import { Model, Types } from 'mongoose';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
    const user: User | null = await this.userMode.findById(id).exec();

    // if user is not found
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // find user by name
  async findOneByUsername(username: string): Promise<User> {
    const user: User | null = await this.userMode
      .findOne({ name: username })
      .exec();

    if (user === null) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async checkUserExists(name: string): Promise<boolean> {
    const user: User | null = await this.userMode.findOne({ name }).exec();

    if (user === null) {
      return false;
    }
    return true;
  }

  async update(id: Types.ObjectId, user: UpdateUserDto): Promise<User> {
    const updatedUser: User | null = await this.userMode
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    if (updatedUser === null) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async delete(id: Types.ObjectId): Promise<void> {
    const deletedUser: User | null = await this.userMode
      .findByIdAndDelete(id, { new: true })
      .exec();

    if (deletedUser === null) {
      throw new NotFoundException('User not found');
    }
  }
}
