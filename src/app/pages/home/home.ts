import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // 👈 IMPORTANTE
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  user: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;
  }

  goLogin() { // 👈 ESTA FUNCIÓN FALTABA
    this.router.navigate(['/login']);
  }
}