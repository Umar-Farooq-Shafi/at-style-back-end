import { Model, ObjectId } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UserService {
    private userMode;
    constructor(userMode: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: ObjectId): Promise<User>;
    update(id: ObjectId, user: UpdateUserDto): Promise<User>;
    delete(id: ObjectId): Promise<void>;
}
