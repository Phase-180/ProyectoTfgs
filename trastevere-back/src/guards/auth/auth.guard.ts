import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/config/env';
import { ECookies } from 'src/core/enums/Ecookies';
import { Erequest } from 'src/core/enums/Erequest';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    const token = req.cookies[ECookies.TOKEN];
    if (!token) throw new UnauthorizedException();

    await this.jwtService
      .verifyAsync(token, {
        secret: envs.SECRET,
      })
      .catch((err) => {
        throw new UnauthorizedException();
      });

    const { id, role } = this.jwtService.decode(token, {
      json: true,
    });
    req[Erequest.USER_ID] = id;
    req[Erequest.USER_ROLE] = role;
    return true;
  }
}
