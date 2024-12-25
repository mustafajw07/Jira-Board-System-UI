import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Stories } from '../models/Story';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private API = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getStoriesOnBoard(boardId: string): Observable<Stories> {
    return this.httpClient.get<Stories>(`${this.API}/board/story/${boardId}`);
  }
}
