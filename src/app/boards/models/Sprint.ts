export interface BoardSprints {
  sprint: Sprint[];
}

export interface Sprint {
  sprintNo: string;
  sprintName: string;
  startDate: string;
  endDate: string;
  boardId: string;
  id?: string;
}
