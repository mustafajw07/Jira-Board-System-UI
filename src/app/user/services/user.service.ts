import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, ProfileDetails } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API = "http://localhost:3000/api";
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.API}/users`);
  }

  getUserDeatils(): Observable<ProfileDetails>{
    return this.httpClient.get<ProfileDetails>(`${this.API}/profile`);
  }
}
