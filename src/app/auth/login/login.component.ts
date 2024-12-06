import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('Usuario autenticado, redirigiendo a /encrypt');
      this.router.navigate(['/encrypt']);
      window.addEventListener('beforeunload', () => {
        sessionStorage.clear(); // Limpia el sessionStorage al cerrar la pestaña
      });
    } 
  }
  
  login() {
    if (!/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.errorMessage = 'El nombre de usuario no debe contener caracteres especiales.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Guarda el token en sessionStorage
        sessionStorage.setItem('token', res.token);

        // Redirige al usuario
        this.router.navigate(['/encrypt']);
      },
      error: (err) => {
        if (err.error?.message === 'Incorrect password') {
          this.errorMessage = 'Contraseña incorrecta. Intenta de nuevo.';
        } else {
          this.errorMessage = err.error?.error || 'Error en el inicio de sesión.';
        }
      },
    });
  }

  validateUsername(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  validatePassword(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
