export class CreateUserDto {
  name!: string;
  email!: string;
  phone!: number;
  password!: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: number;
  password?: string;
}
