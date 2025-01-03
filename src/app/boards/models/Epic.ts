export interface Epics {
  epics: Epic[];
}

export interface Epic {
  epicId: string;
  epicName: string;
  description: string;
}
