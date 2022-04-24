import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Observable } from 'rxjs';
import { UserService } from './../user.service';
import { User } from './../interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './../dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: CreateUserDto): Promise<HttpStatus>;
    findAll(): Observable<Promise<User[]>>;
    findOne(id: ObjectId): Promise<User>;
    update(id: ObjectId, user: UpdateUserDto): Promise<User>;
    delete(id: ObjectId): Promise<HttpStatus>;
}
