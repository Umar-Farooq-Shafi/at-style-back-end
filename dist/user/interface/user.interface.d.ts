import { Document } from 'mongoose';
export interface User extends Document {
    readonly name: string;
    readonly email: string;
    readonly phone: number;
    readonly password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
