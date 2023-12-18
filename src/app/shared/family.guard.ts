import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FamilyService } from '../family/family.service';
import { tap } from 'rxjs';

export const familyGuard: CanActivateFn = (route, state) => {
  const familyService = inject(FamilyService)
  const router = inject(Router)

  return familyService.hasFamily$.pipe(
    tap(hasFamily => {
      if (!hasFamily){
        router.navigate(['/'])
      }
    })
  )
};
