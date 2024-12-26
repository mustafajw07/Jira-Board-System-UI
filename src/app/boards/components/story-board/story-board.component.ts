import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { Sprint } from '../../models/Sprint';
import { Story } from '../../models/Story';
import { SprintService } from '../../services/sprint.service';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-board',
  templateUrl: './story-board.component.html',
  styleUrls: ['./story-board.component.css'],
})
export class StoryBoardComponent implements OnInit {
  @Input() set userId(id: string) {
    if (id) {
      this._userId = id;
      this.sortStoryOnBoard(this.userSprintStories);
    } else {
      this._userId = '';
      this.sortStoryOnBoard(this.activeSprintStories);
    }
  }
  private boardId!: string;
  protected stories: Story[] = [];
  protected boardSprints: Sprint[] = [];
  protected activeSprint!: Sprint;
  protected activeSprintStories: Story[] = [];
  protected userSprintStories: Story[] = [];
  private _userId!: string;
  protected loading = false;
  protected boardColumns: any = [
    {
      title: 'To Do',
      stories: [],
    },
    {
      title: 'In Progress',
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

  constructor(
    private storyService: StoryService,
    private sprintService: SprintService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.boardId = p['id'];
      this.getSprintById(this.boardId);
    });
  }

  sortStoryOnBoard(stories: Story[]) {
    stories.forEach((e) => {
      this.boardColumns.forEach((i: any) => {
        if (
          e.status.name.toLocaleLowerCase() === 'todo' &&
          i.title === 'To Do'
        ) {
          i.stories.push(e);
        } else if (
          e.status.name.toLocaleLowerCase() === 'inprogress' &&
          i.title === 'In Progress'
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

  getStoryOnBoard(boardId: string) {
    this.storyService.getStoriesOnBoard(boardId).subscribe({
      next: (res) => {
        this.stories = res.stories;
        this.activeSprintStories = this.stories.filter(
          (i) => this.activeSprint.id === i.sprint.id,
        );
        this.userSprintStories = this.stories.filter(
          (i) => this._userId === i.reporter.id,
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
    this.sprintService.getSprintbyBoardId(boardId).subscribe({
      next: (res) => {
        this.boardSprints = res.sprint;
        this.activeSprint = this.filterByEndDate(this.boardSprints);
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
      complete: () => {
        this.getStoryOnBoard(this.boardId);
      },
    });
  }

  filterByEndDate = (dataArray: Sprint[]) => {
    const currentDate = new Date();
    return dataArray.filter((item) => new Date(item.endDate) > currentDate)[0];
  };

  get connectedLists() {
    return this.boardColumns.map(
      (_: any, index: any) => `cdk-drop-list-${index}`,
    );
  }

  onDrop(event: any) {
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
  }
}
