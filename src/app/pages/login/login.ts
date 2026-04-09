import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  message: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onSubmit() {

    this.message = '';
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Completar todos los campos';
      return;
    }

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password
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