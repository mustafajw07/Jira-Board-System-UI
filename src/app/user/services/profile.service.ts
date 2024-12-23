import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API = "http://localhost:3000/api";
  constructor(private httpClient: HttpClient) { }
}
