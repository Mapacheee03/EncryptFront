import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private baseUrl = 'https://encryptback.onrender.com/api/crypto';

  constructor(private http: HttpClient) {}

  encrypt(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/encrypt`, { text });
  }

  decrypt(encrypted: string, iv: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/decrypt`, { encrypted, ivHex: iv });
  }
}
