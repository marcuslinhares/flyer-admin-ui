import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://api.flyer.marcuslinhares.ip-ddns.com/api/collections/_superusers/auth-with-password';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { identity: email, password }).pipe(
      catchError((err) => {
        console.error('Erro de login:', err);
        throw err; // Repassa o erro para o componente
      })
    );
  }

  // Armazenando o token com expiração em sessionStorage
  storeToken(token: string) {
    const expirationTime = this.jwtHelper.getTokenExpirationDate(token)?.getTime() || Date.now() + 3600000; // Expira em 1 hora
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('tokenExpiration');
    if (token && expiration) {
      return Date.now() < parseInt(expiration) && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
