import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/user.dto';
export declare class UserService {
    private userMode;
    constructor(userMode: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
}
