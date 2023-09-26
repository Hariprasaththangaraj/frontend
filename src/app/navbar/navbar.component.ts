import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    //remove token 
    this.auth.removeToken();
    this.auth.canAccess();
  }
}
