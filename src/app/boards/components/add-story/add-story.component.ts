import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { AddSprintComponent } from '../add-sprint/add-sprint.component';
import { Board } from '../../models/Board';
import { StoryService } from '../../services/story.service';
import { Priorities, Priority } from '../../models/Priority';
import { SprintService } from '../../services/sprint.service';
import { Sprint } from '../../models/Sprint';
import { UserService } from 'src/app/user/services/user.service';
import { ProfileData } from 'src/app/user/models/Profile';
import { Epic } from '../../models/Epic';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
})
export class AddStoryComponent implements OnInit{
  form: FormGroup;
  boardId?: string;
  protected projects: Board[] = [];
  protected priorities: Priority[] =[];
  protected sprints: Sprint[] = [];
  protected reporters:ProfileData[] = [];
  protected assignees:ProfileData[] = [];
  protected epics:Epic[] = [];
  protected issueTypes = ['Epic', 'Story'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public boards: Board[],
    private matDialogRef: MatDialogRef<AddSprintComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private storyService: StoryService,
    private sprintService: SprintService,
    private userService: UserService,
  ) {
    this.form = this.fb.group({
      project: ['', Validators.required],
      issueType: ['', Validators.required],
      summary: ['', Validators.required],
      reporter: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      epicLink: ['', Validators.required],
      sprint: ['', Validators.required],
    });
    this.boardId = boards[0].id;
  }

  ngOnInit(): void {
    this.projects = this.boards;
    this.getPriorities();
    this.getSprintsByBoardId(this.boardId || "");
    this.getEpics(this.boardId || "" );
    this.getUsers();
  }

  getSprintsByBoardId(boardId: string){
    this.sprintService.getSprintbyBoardId(boardId).subscribe({
      next: (res) => {this.sprints = res.sprint},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
    });
  }
  
  getPriorities(){
    this.storyService.getPriorities().subscribe({
      next: (res) => {this.priorities = res.priorities},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
    });
  }

  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (res) => {this.reporters = res.users; this.assignees = res.users},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
    });
  }

  getEpics(boardId: string){
    this.storyService.getEpics(boardId).subscribe({
      next: (res) => {this.epics = res.epics},
      error: (err) => {this.snackbarService.openErrorSnackbar(err.error , "X")},
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
