// DTO for creating users
export class CreateUserDto {
  name!: string;
  gender!: string;
  email!: string;
  phone!: number;
  password!: string;
  repeatPassword!: string;
  referralCode!: string;
}

// DTO for updating the users
export class UpdateUserDto {
  name?: string;
  gender?: string;
  email?: string;
  phone?: number;
  password?: string;
  referralCode?: string;
  updatedAt?: Date;
}
