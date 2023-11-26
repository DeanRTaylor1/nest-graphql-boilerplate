import { env } from '@modules/config/env';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.auth.jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log('validating');
    return { userId: payload.sub, username: payload.username };
  }
}
