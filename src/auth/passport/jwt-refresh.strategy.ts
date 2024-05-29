import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
