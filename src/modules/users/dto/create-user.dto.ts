import { ToSnake, ICreateAttributes } from '@modules/base/global.types';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { User } from '../user.entity';
import { UserStatusEnum, RoleEnum } from '../user.enum';

export class CreateUserDto implements ToSnake<ICreateAttributes<User>> {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(() => UserStatusEnum)
  @IsOptional()
  status: UserStatusEnum;

  @IsEnum(() => RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
