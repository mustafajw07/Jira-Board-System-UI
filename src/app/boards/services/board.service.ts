import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  API = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getAllBoards():Observable<Board[]>{
    return this.httpClient.get<Board[]>(`${this.API}/boards`);
  }

  getAllUserBoards():Observable<Board[]>{
    return this.httpClient.get<Board[]>(`${this.API}/user/boards`);
  }
}
