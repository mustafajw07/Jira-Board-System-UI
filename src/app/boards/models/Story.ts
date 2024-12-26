import { User } from './ProjectBoard';
import { Sprint } from './Sprint';

export interface Stories {
  stories: Story[];
}

export interface Story {
  id: string;
  title: string;
  description: string;
  flag: boolean;
  storyPoint: number | null;
  boardId: string;
  reporter: User;
  teamMember: string;
  assigned: User;
  sprint: Sprint;
  epic: string;
  priority: Priority;
  type: Type;
  status: Status;
}

interface Priority {
  priority: string;
  id: string;
}

interface Type {
  type: string;
  id: string;
}

interface Status {
  name: string;
  id: string;
}
