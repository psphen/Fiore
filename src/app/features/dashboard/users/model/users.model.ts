export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
}

export type CreateUserDTO = Omit<User, 'id' | 'role'>;

export type UpdateUserDTO = Pick<User, 'email' | 'name'>;
