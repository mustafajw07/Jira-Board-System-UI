import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/Board';
import { ProjectBoard } from '../models/ProjectBoard';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private API = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getAllBoards():Observable<Board[]>{
    return this.httpClient.get<Board[]>(`${this.API}/boards`);
  }

  getAllUserBoards():Observable<Board[]>{
    return this.httpClient.get<Board[]>(`${this.API}/user/boards`);
  }

  addBoard(body: Board): Observable<string>{
    return this.httpClient.post<string>(`${this.API}/board` , body);
  }

  getBoardById(boardId: string): Observable<ProjectBoard>{
    return this.httpClient.get<ProjectBoard>(`${this.API}/board/${boardId}`);
  }

}