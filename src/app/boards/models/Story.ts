import { User } from './ProjectBoard';
import { Sprint } from './Sprint';

export interface Stories {
  stories: Story[];
}

export interface Story {
  id: string;
  title: string;
  description: string;
  storyPoint: number | null;
  boardId: string;
  reporter: User;
  assigned: User;
  sprint: Sprint;
  epic: string;
  priority: Priority;
  type: Type;
  status: Status;
}

export interface StoryReqBody{
  title: string;
  description: string;
  sprintId?: string;
  storyPoint?: number | null;
  reporter: string;
  assigned?: string;
  epic?: string;
  priority?: string;
  type?: string;
  status?: string;
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
