import { IsEmail, IsString } from 'class-validator';

// 생성시 검사 항목
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

// 수정시 검사 항목
export class UpdateUserDto {
  @IsString()
  password: string;

  @IsString()
  username: string;
}
