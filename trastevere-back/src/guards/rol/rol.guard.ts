import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Erequest } from 'src/core/enums/Erequest';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class RolGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = req[Erequest.USER_ROLE];
    if (role !== 'ADMIN') {
      throw new UnauthorizedException();
      return false;
    }
    return true;
  }
}
