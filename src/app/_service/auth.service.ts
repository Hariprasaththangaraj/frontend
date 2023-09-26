import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }


  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  register(name: string, email: string, password: string) {
    //send data to register api

    return this.http
      .post<{ idToken: string }>('http://localhost:8080/v1/register',
        {
          name: name,
          email: email,
          password: password
        })
  }


  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  login(email: string, password: string) {
    //send data to login api

    return this.http
      .post<{ idToken: string }>('http://localhost:8080/v1/login',
        {
          email, password
        }
      )
  }

  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
}
