import {
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Story } from '../../models/Story';
import { SprintService } from '../../services/sprint.service';
import { Sprint } from '../../models/Sprint';

interface BoardColums{
  title: string,
  stories: Story[];
}

@Component({
  selector: 'app-story-board',
  templateUrl: './story-board.component.html',
  styleUrls: ['./story-board.component.css'],
})
export class StoryBoardComponent implements OnInit {
  @Input() set userId(id: string){
    this._userId = id;
  }
  protected stories!: Story[];
  private boardId!: string;
  protected activeSprint!: Sprint;
  protected boardSprints!: Sprint[];
  protected activeSprintStories!: Story[];
  private _userId!: string;
  protected boardColumns:any = [
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

  getStoryOnBoard(boardId: string) {
    this.storyService.getStoriesOnBoard(boardId).subscribe({
      next: (res) => {
        this.stories = res.stories;
        this.activeSprintStories = this.stories.filter((i) => this.activeSprint.id === i.sprintId);
        this.activeSprintStories.forEach((e) => {
          this.boardColumns.forEach((i:any) => {
            if(e.status.status.toLocaleLowerCase() === "todo" && i.title === "To Do"){
              i.stories.push(e);
            }else if(e.status.status.toLocaleLowerCase() === "inprogress" && i.title === "In Progress"){
              i.stories.push(e);
            }
            else if(e.status.status.toLocaleLowerCase() === "validation" && i.title === "Validation"){
              i.stories.push(e);
            }
            else if(e.status.status.toLocaleLowerCase() === "done" && i.title === "Done"){
              i.stories.push(e);
            }
          })
        });
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  getSprintById(boardId: string) {
    this.sprintService.getSprintbyBoardId(boardId).subscribe({
      next: (res) => {
        this.boardSprints = res.sprint;
        this.activeSprint = this.filterByEndDate(this.boardSprints);
        this.getStoryOnBoard(this.boardId);
      },
      error: (err) => {
        this.snackbarService.openErrorSnackbar(err.error, 'X');
      },
    });
  }

  filterByEndDate = (dataArray: Sprint[]) => {
    const currentDate = new Date();
    return dataArray.filter(item => new Date(item.endDate) > currentDate)[0];
  };


  get connectedLists() {
    return this.boardColumns.map((_: any, index:any) => `cdk-drop-list-${index}`);
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
