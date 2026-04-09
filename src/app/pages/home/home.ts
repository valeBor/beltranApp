import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  user:any=null;

  ngOnInit() { 
    const data=localStorage.getItem('user');
    this.user=data? JSON.parse(data):null;
    
  }

  logout(){
    localStorage.removeItem('user');
    this.user=null;

  }
 


}
