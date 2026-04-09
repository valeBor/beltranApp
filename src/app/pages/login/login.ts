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

  constructor(private router: Router) {}

  onSubmit() {

    if (!this.email || !this.password) {
      console.log('Campos incompletos');
      return;
    }

    //
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
      localStorage.setItem('user',JSON.stringify({email: this.email,role:data.role} ));

      // redirigir después del login
      this.router.navigate(['/home']);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}



