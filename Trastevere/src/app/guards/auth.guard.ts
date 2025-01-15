import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return firstValueFrom(authService.renewToken())
    .then((e) => {
      return true;
    })
    .catch((e) => {
      router.navigate(['/auth/login']);
      return false;
    });
};
