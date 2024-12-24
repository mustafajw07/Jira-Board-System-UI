export interface Profile {
  users: ProfileData[];
}

export interface ProfileDetails {
  user: ProfileData;
}

export interface ProfileData {
  userName: string;
  email: string;
  id: string;
  role: Role;
}

export interface Role {
  title: string;
  id: string;
}
