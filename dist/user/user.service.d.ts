import { Model, Types } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UserService {
    private userMode;
    constructor(userMode: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: Types.ObjectId): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    checkUserExists(name: string): Promise<boolean>;
    update(id: Types.ObjectId, user: UpdateUserDto): Promise<User>;
    delete(id: Types.ObjectId): Promise<void>;
}
