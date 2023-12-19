import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(AuthService)

  return auth.isLoggedIn$.pipe(tap(
    loggedIn => {
      if (!loggedIn) {
        router.navigate(['/auth/login'])
      }
    }
  ))
};
