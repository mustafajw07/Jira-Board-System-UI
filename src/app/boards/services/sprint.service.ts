import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardSprints } from '../models/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
 private API = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getSprintbyBoardId(boardId: string): Observable<BoardSprints>{
    return this.httpClient.get<BoardSprints>(`${this.API}/sprint/${boardId}`)
  }

}