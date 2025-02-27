import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Epic } from '../models/Epic';
import { Priorities } from '../models/Priority';
import { Status, Stories, StoryReqBody } from '../models/Story';
import { StoryType } from '../models/StoryTypes';

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

  getEpics(boardId: string): Observable<Epic[]> {
    return this.httpClient.get<Epic[]>(`${this.API}/epic/${boardId}`);
  }

  getStoryTypes(): Observable<StoryType[]> {
    return this.httpClient.get<StoryType[]>(`${this.API}/story-type`);
  }

  getStoryStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${this.API}/story-status`);
  }

  addStory(body: StoryReqBody, boardId: string): Observable<string> {
    return this.httpClient.post<string>(`${this.API}/story/${boardId}`, body);
  }

  addEpic(body: Epic, boardId: string): Observable<string> {
    return this.httpClient.post<string>(`${this.API}/epic/${boardId}`, body);
  }

  updateStory(body: StoryReqBody, storyId: string): Observable<string> {
    return this.httpClient.put<string>(`${this.API}/story/${storyId}`, body);
  }

  deleteStory(storyId: string) {
    return this.httpClient.delete<string>(`${this.API}/story/${storyId}`);
  }
}
