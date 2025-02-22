import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { Sprint } from '../../models/Sprint';
import { Status, Story } from '../../models/Story';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-board',
  templateUrl: './story-board.component.html',
})
export class StoryBoardComponent implements OnInit {
  @Input() set userId(id: string) {
    if (id) {
      this._userId = id;
      this.userSprintStories = this.stories.filter(
        (i) => this._userId === i.assigned.id,
      );
      this.sortStoryOnBoard(this.userSprintStories);
    } else {
      this._userId = '';
      this.sortStoryOnBoard(this.activeSprintStories);
    }
  }
  @Input() reload!: Observable<void>;
  protected stories: Story[] = [];
  protected boardSprints: Sprint[] = [];
  protected activeSprint!: Sprint;
  protected activeSprintStories: Story[] = [];
  protected userSprintStories: Story[] = [];
  protected loading = false;
  protected noActiveSprint = false;
  protected boardColumns: any = [];
  private boardId!: string;
  private _userId!: string;
  private status: Status[] = [];

  constructor(
    private storyService: StoryService,
    private sprintService: SprintService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.reload.subscribe(() => this.getSprintById(this.boardId));
    this.activatedRoute.params.subscribe((p) => {
      this.boardId = p['id'];
      this.getSprintById(this.boardId);
    });
    this.getStoryStatus();
  }

  getStoryStatus() {
    this.storyService.getStoryStatus().subscribe((res: Status[]) => {
      this.status = res;
    });
  }

  sortStoryOnBoard(stories: Story[]) {
    this.boardColumns = [
      {
        title: 'Todo',
        stories: [],
      },
      {
        title: 'In Progress',
        stories: [],
      },
      {
        title: 'Code Review',
        stories: [],
      },
      {
        title: 'Validation',
        stories: [],
      },
      {
        title: 'Done',
        stories: [],
      },
    ];
    stories.forEach((e) => {
      this.boardColumns.forEach((i: any) => {
        if (
          e.status.name.toLocaleLowerCase() === 'todo' &&
          i.title === 'Todo'
        ) {
          i.stories.push(e);
        } else if (
          e.status.name.toLocaleLowerCase() === 'in progress' &&
          i.title === 'In Progress'
        ) {
          i.stories.push(e);
        } else if (
          e.status.name.toLocaleLowerCase() === 'code review' &&
          i.title === 'Code Review'
        ) {
          i.stories.push(e);
        } else if (
          e.status.name.toLocaleLowerCase() === 'validation' &&
          i.title === 'Validation'
        ) {
          i.stories.push(e);
        } else if (
          e.status.name.toLocaleLowerCase() === 'done' &&
          i.title === 'Done'
        ) {
          i.stories.push(e);
        }
      });
    });
  }

  getStoryOnBoard(boardId: string, sprintId: string) {
    this.storyService.getStoriesOnBoard(boardId).subscribe({
      next: (res) => {
        this.stories = res.stories;
        this.activeSprintStories = this.stories.filter(
          (i) => i.sprint?.id == sprintId,
        );
        this.sortStoryOnBoard(this.activeSprintStories);
        this.loading = false;
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getSprintById(boardId: string) {
    this.loading = true;
    this.sprintService.getActiveSprintbyBoardId(boardId).subscribe({
      next: (res) => {
        this.boardSprints = res.sprint;
        this.activeSprint = res.sprint[0];
        if (!this.activeSprint) {
          this.noActiveSprint = true;
        }
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.getStoryOnBoard(this.boardId, this.activeSprint?.id || '');
      },
    });
  }

  get connectedLists() {
    return this.boardColumns.map(
      (_: any, index: any) => `cdk-drop-list-${index}`,
    );
  }

  ngAfterViewInit(): void {
    // Force change detection if necessary
    setTimeout(() => {
      this.connectedLists;
    });
  }

  updateStatus(data: any) {
    const body = data.stories[0];
    const status = data.title;
    const newStatus = this.status.filter(
      (s) => s.name.toLocaleLowerCase() === status.toLocaleLowerCase(),
    )[0];
    body.assigned = body.assigned.id;
    body.priority = body.priority.id;
    body.reporter = body.reporter.id;
    body.sprint = body.sprint.id;
    body.type = body.type.id;
    body.status = newStatus.id;
    console.log(body);

    // this.storyService.updateStory(story , story.id).subscribe({
    //   next: () => {
    //     if(this._userId){
    //       this.sortStoryOnBoard(this.userSprintStories);
    //     }else{
    //       this.sortStoryOnBoard(this.activeSprintStories);
    //     }
    //   },
    //   error: (err) => {
    //     this.snackbarService.openErrorSnackbar(err.error, 'X');
    //   }
    // });
  }

  onDrop(event: any, data: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.updateStatus(data);
  }
}
