import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { HeaderComponent } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer, CommonModule], // 👈 IMPORTANTE
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showHeader: boolean = true; // 👈 ESTA LÍNEA FALTABA

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const hiddenRoutes = ['/login', '/register'];

        this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}