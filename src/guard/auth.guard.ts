import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verifica si el token existe
  if (!authService.isLoggedIn()) {
    alert('No tienes permisos, inicia sesión.');
    router.navigate(['/login']); // Redirige al login
    return false;
  }

  return true; // Permite el acceso si está autenticado
};
