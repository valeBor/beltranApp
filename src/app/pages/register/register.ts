import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {

    // validación básica
    if (!this.email || !this.password) {
      console.log('Campos incompletos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    // 🔥 FETCH AL BACKEND
    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // redirigir al login
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}