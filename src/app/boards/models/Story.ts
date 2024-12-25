import { User } from "src/app/shared/models/User";

export interface Stories{
    stories: Story[];
}

export interface Story{
    id: string,
    title: string,
    description: string,
    flag: boolean,
    storyPoint: number | null,
    boardId: string,
    reporter: User,
    teamMember: string,
    assigned: string,
    sprintId: string,
    epic: string,
    priority: Priority
    type: Type
    status: Status
}

interface Priority{
    priority:string,
    id: string
}

interface Type{
    type: string,
    id: string
}   

interface Status{
    status: string,
    id: string
}