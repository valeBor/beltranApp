

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 FALTA ESTO

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // 👈 Y ESTO
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {}
