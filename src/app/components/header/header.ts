import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {



user: any;

ngOnInit() {
  const data = localStorage.getItem('user');
  this.user = data ? JSON.parse(data) : null;
}

logout() {
  localStorage.removeItem('user');
  window.location.reload();
}
}