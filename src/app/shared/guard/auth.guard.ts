import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  console.log('token', token);
  const router = inject(Router);
  if (!token) {
    router.navigate(['/Login']);
    return false;
  } else {
    return true;
  }

  return true;
};
