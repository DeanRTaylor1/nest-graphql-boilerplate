import { randomBytes } from 'crypto';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@modules/users/user.entity';
import { UsersService } from '@modules/users/users.service';

import { scryptAsync } from './utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, suppliedPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await this.compare({
      storedPassword: user.password,
      suppliedPassword,
    });

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const { password, ...rest } = user.get();

    return rest;
  }

  async login(user: User) {
    const { id, email } = user;
    const access_token = this.jwtService.sign({ email, sub: id });
    return {
      access_token,
      user,
    };
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${derivedKey.toString('hex')}.${salt}`;
  }

  public async compare({
    storedPassword,
    suppliedPassword,
  }: {
    storedPassword: string;
    suppliedPassword: string;
  }): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const derivedKey = await scryptAsync(suppliedPassword, salt, 64);
    return derivedKey.toString('hex') === hashedPassword;
  }
}
