

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  constructor(private router:Router){}

logout(){
localStorage.removeItem('user');
this.router.navigate(['/login'])

}



}
