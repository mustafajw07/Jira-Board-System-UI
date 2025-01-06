import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-priority-icon',
  templateUrl: './priority-icon.component.html',
})
export class PriorityIconComponent {
  @Input() priority!: string;

  get priorityClass(): string {
    switch (this.priority) {
      case 'lowest':
        return 'text-blue-400';
      case 'low':
        return 'text-blue-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-400';
      case 'highest':
        return 'text-red-500';
      default:
        return 'text-blue-400';
    }
  }
}
