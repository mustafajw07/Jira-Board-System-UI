import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { Story } from '../../models/Story';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
})
export class StoryCardComponent {
  @Input() ticket!: Story;

  constructor(
    private storyService: StoryService,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
  ) {}

  editStory() {
    console.log(this.ticket);
  }

  openDeleteDialog() {
    const dialog = this.matDialog.open(DeletePopupComponent, {
      data: 'Are you sure?',
      width: '350px',
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteStory();
      }
    });
  }

  deleteStory() {
    this.storyService.deleteStory(this.ticket.id).subscribe({
      next: (res) => {
        this.snackbarService.openSuccessSnackbar(res, 'X');
      },
      error: (err) => {
        this.snackbarService.openSuccessSnackbar(err.error, 'X');
      },
    });
  }
}
