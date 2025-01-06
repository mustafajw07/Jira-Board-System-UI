import { Component, Input } from '@angular/core';

import { Story } from '../../models/Story';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
})
export class StoryCardComponent {
  @Input() ticket!: Story;

  editStory() {
    console.log(this.ticket);
  }

  deleteStory() {
    console.log(this.ticket);
  }
}
