export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export type CreateUserDTO = Omit<User, 'id' | 'role'>;

export type UpdateUserDTO = Pick<User, 'email' | 'name'>;
