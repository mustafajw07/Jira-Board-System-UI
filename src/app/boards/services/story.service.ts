import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Epics } from '../models/Epic';
import { Priorities } from '../models/Priority';
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

  getPriorities(): Observable<Priorities> {
    return this.httpClient.get<Priorities>(`${this.API}/story-priority`);
  }

  getEpics(boardId: string): Observable<Epics> {
    return this.httpClient.get<Epics>(`${this.API}/epic/${boardId}`);
  }
}
