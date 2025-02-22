import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProfileData } from 'src/app/user/models/Profile';
import { UserService } from 'src/app/user/services/user.service';

import { Board } from '../../models/Board';
import { Epic } from '../../models/Epic';
import { Priority } from '../../models/Priority';
import { Sprint } from '../../models/Sprint';
import { StoryType } from '../../models/StoryTypes';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
})
export class AddStoryComponent implements OnInit {
  form: FormGroup;
  boardId?: string;
  protected projects: Board[] = [];
  protected priorities: Priority[] = [];
  protected sprints: Sprint[] = [];
  protected reporters: ProfileData[] = [];
  protected assignees: ProfileData[] = [];
  protected epics: Epic[] = [];
  protected issueTypes = ['Epic', 'Story', 'Bug'];
  protected stroyTypes: StoryType[] = [];
  protected isEpic = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public boards: Board[],
    private matDialogRef: MatDialogRef<AddStoryComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private storyService: StoryService,
    private sprintService: SprintService,
    private userService: UserService,
  ) {
    this.form = this.fb.group({
      project: ['', Validators.required],
      issueType: ['Story', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      flag: [false],
      storyPoint: [''],
      sprint: [''],
      reporter: [''],
      priority: [''],
      assignee: [''],
      epic: [''],
    });
    this.boardId = boards[0].id;
  }

  ngOnInit(): void {
    this.projects = this.boards;
    this.getPriorities();
    this.getSprintsByBoardId(this.boardId || '');
    this.getEpics(this.boardId || '');
    this.getUsers();
    this.getStoryTypes();
  }

  getSprintsByBoardId(boardId: string) {
    this.sprintService.getSprintbyBoardId(boardId).subscribe({
      next: (res) => {
        this.sprints = res.sprint;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  getStoryTypes() {
    this.storyService.getStoryTypes().subscribe({
      next: (res) => {
        this.stroyTypes = res;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  getPriorities() {
    this.storyService.getPriorities().subscribe({
      next: (res) => {
        this.priorities = res.priorities;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.reporters = res.users;
        this.assignees = res.users;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  getEpics(boardId: string) {
    this.storyService.getEpics(boardId).subscribe({
      next: (res) => {
        this.epics = res;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  checkStoryType(event: any) {
    this.isEpic = event.value === 'Epic' ? true : false;
  }

  updateBoardId(event: any) {
    this.boardId = event.value;
    this.getSprintsByBoardId(this.boardId || '');
    this.form.controls['sprint'].setValue('');
  }

  cancel() {
    this.matDialogRef.close();
  }

  onSubmit() {
    if (this.isEpic) {
      const payload = {
        title: this.form.value.title,
        description: this.form.value.description,
        priority: this.form.value.priority && this.form.value.priority,
        reporter: this.form.value.priority && this.form.value.priority,
      };
      this.storyService.addEpic(payload, this.boardId || '').subscribe({
        next: (res) => {
          this.snackbarService.openSuccessSnackbar(res, 'X');
        },
        error: (err) => {
          this.snackbarService.openErrorSnackbar(err.error, 'X');
        },
        complete: () => {
          this.matDialogRef.close();
        },
      });
    } else {
      const type = this.stroyTypes.filter(
        (i) => i.type === this.form.value.issueType,
      )[0].id;
      const payload = {
        title: this.form.value.title,
        description: this.form.value.description,
        sprintId: this.form.value.sprint,
        storyPoint: this.form.value.storyPoint && this.form.value.storyPoint, //add input
        flag: this.form.value.flag && this.form.value.flag, // add input
        reporter: this.form.value.reporter && this.form.value.reporter,
        assigned: this.form.value.assignee && this.form.value.assignee,
        epic: this.form.value.epic && this.form.value.epic,
        priority: this.form.value.priority && this.form.value.priority,
        type: type,
      };
      this.storyService.addStory(payload, this.boardId || '').subscribe({
        next: (res) => {
          this.snackbarService.openSuccessSnackbar(res, 'X');
        },
        error: (err) => {
          this.snackbarService.openErrorSnackbar(err.error, 'X');
        },
        complete: () => {
          this.matDialogRef.close();
        },
      });
    }
  }
}
