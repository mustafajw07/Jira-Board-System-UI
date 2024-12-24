import { Component, Input } from '@angular/core';

import { User } from '../../models/ProjectBoard';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  @Input() users?: User[];
  isCollapsed = true;
  selectedTab: any = { label: 'Board', icon: 'dashboard' };

  tabs = [
    { label: 'Board', icon: 'dashboard' },
    // { label: 'Backlog', icon: 'folder', },
    // { label: 'Reports', icon: 'assessment', content: 'Reports Content' },
    // { label: 'Settings', icon: 'settings', content: 'Settings Content' }
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectTab(tab: any) {
    this.selectedTab = tab;
  }
}
