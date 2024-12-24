export interface ProjectBoard {
  id: string;
  boardName: string;
  description: string;
  users: User[];
}

interface User {
  id: string;
  email: string;
  userName: string;
  role: string;
}
