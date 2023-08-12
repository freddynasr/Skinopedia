import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://api.skinopedia-lb.com';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  loginRequest(credentials: any, filldata: any) {
    this.http
      .post(`${this.baseUrl}/auth/Login`, credentials)
      .subscribe((data: any) => {
        console.log(data);
        if (data.Auth_Key) {
          this.isLoggedIn = true;
          filldata(data);
          localStorage.setItem('token', data.Auth_Key);
        }
      });
  }
  isLoggedIn = false;
  isAuthenticated() {
    return this.isLoggedIn;
  }
  Logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
}
