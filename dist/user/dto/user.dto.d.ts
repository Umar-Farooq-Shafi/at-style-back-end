export declare class CreateUserDto {
    name: string;
    gender: string;
    email: string;
    phone: number;
    password: string;
    repeatPassword: string;
    referralCode: string;
}
export declare class UpdateUserDto {
    name?: string;
    gender?: string;
    email?: string;
    phone?: number;
    password?: string;
    referralCode?: string;
    updatedAt?: Date;
}
