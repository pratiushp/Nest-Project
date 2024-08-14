import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name should be in string' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Provide valid email' })
  email: string;
  phone: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
  address: string;
}

export class UpdateUserDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export class loginUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Provide valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}

export class forgetPassworDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Provide valid email' })
  email: string;
}
