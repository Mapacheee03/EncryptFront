import { Component } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css'],
})
export class EncryptComponent {
  plaintext = '';
  textcifrado = '';
  Iv = '';

  constructor(private cryptoService: CryptoService,private authService: AuthService) {}
  
  encrypt() {
    this.cryptoService.encrypt(this.plaintext).subscribe({
      next: (res) => {
        this.textcifrado = `${res.encrypted}`;
        this.Iv = `${res.iv}`;
      },
      error: (err) => console.error('Encryption failed', err),
    });
  }

  GoToDecrypt() {
    window.location.href = '/decrypt';
  }
  
  goTologout() {
    this.authService.logout(); // Llama al método logout para eliminar el token
    window.location.href = '/login'; // Redirige a la página de login
  }
}
