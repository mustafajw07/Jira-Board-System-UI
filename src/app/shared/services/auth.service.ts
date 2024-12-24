import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API = "http://localhost:3000/api";
  isUserLogin = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  login(user: User){
    return this.httpClient.post(`${this.API}/login`, user);
  }

  getToken(): string{
    return localStorage.getItem("token") || "";
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }

  saveUserToken(token: string){
    localStorage.setItem("token" , token);
    this.isUserLogin.next(true);
  }

  logout(){
    localStorage.removeItem("token")
  }
}
