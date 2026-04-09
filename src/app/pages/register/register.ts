import { Component, OnInit } from '@angular/core';
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
export class Register implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  message: string = '';
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if (user) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {

    this.message = '';
    this.error = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Completar todos los campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

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

      if (data.message === 'Usuario creado') {

        this.message = 'Registrado con éxito';

        // limpiar formulario
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);

      } else {
        this.error = data.message;
      }

    })
    .catch(() => {
      this.error = 'Error al registrar';
    });
  }
}