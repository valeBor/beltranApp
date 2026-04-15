import { Component, AfterViewInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


declare var turnstile: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit{

  email: string = '';
  password: string = '';

  message: string = '';
  error: string = '';
  captchaToken: string = '';

  constructor(private router: Router) {}

  ngAfterViewInit() {
  setTimeout(() => {
    if (typeof turnstile !== 'undefined') {
      turnstile.render('#turnstile-container', {
        sitekey: '0x4AAAAAAC9z5NftN9IYvg4_',
        callback: (token: string) => {
       this.captchaToken = token;
      }
    });
    }
  }, 1000);
}

  onSubmit() {

    this.message = '';
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Completar todos los campos';
      return;
    }

    if (!this.captchaToken) {
  this.error = 'Completá el captcha';
  return;
}

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
         captchaToken: this.captchaToken

      })
    })
    .then(res => res.json())
    .then(data => {

      if (data.message === 'Login OK') {

        localStorage.setItem('user', JSON.stringify({
          email: data.email,
          role: data.role
        }));

        this.message = 'Login correcto';

        // limpiar
        this.email = '';
        this.password = '';

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);

      } else {
        this.error = data.message;
      }

    })
    .catch(() => {
      this.error = 'Error de conexión con el servidor';
    });
  }
}