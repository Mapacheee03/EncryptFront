import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // URL de la API

  constructor(private http: HttpClient, private router: Router) {}

  // Verificar si el token existe en sessionStorage
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Devuelve true si hay token
  }

  // Iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para guardar token en sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem('token', token); // Guarda el token
  }

  // Obtener el token (opcional)
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }
}
