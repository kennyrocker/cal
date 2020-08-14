export interface User extends Login {
  userName: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UserState {
  id: string;
  userName: string;
  email: string;
}
