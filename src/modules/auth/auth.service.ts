import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...rest } = user.get();
      return rest;
    }
    return null;
  }

  async login(user: User) {
    const { id, email } = user;
    const access_token = this.jwtService.sign({ email, sub: id });
    return {
      access_token,
      user,
    };
  }
}
