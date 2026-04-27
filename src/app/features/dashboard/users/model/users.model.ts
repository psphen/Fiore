export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
  phone?: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

export type CreateUserDTO = Omit<User, 'id' | 'role'>;

export type UpdateUserDTO = Pick<User, 'email' | 'name'>;

export const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'admin@fiore.com',
    password: 'hashed',
    name: 'Admin Fiore',
    role: 'admin',
    avatar: 'https://placehold.co/100x100?text=AF',
    phone: '+5491155555555',
    createdAt: new Date('2023-01-01'),
    status: 'active',
  },
  {
    id: 2,
    email: 'maria@email.com',
    password: 'hashed',
    name: 'María García',
    role: 'customer',
    avatar: 'https://placehold.co/100x100?text=MG',
    phone: '+5491155555556',
    createdAt: new Date('2023-06-15'),
    status: 'active',
  },
  {
    id: 3,
    email: 'carlos@email.com',
    password: 'hashed',
    name: 'Carlos López',
    role: 'customer',
    avatar: 'https://placehold.co/100x100?text=CL',
    phone: '+5491155555557',
    createdAt: new Date('2023-08-20'),
    status: 'active',
  },
  {
    id: 4,
    email: 'ana@email.com',
    password: 'hashed',
    name: 'Ana Martínez',
    role: 'customer',
    avatar: 'https://placehold.co/100x100?text=AM',
    phone: '+5491155555558',
    createdAt: new Date('2023-10-10'),
    status: 'inactive',
  },
  {
    id: 5,
    email: 'juan@email.com',
    password: 'hashed',
    name: 'Juan Pérez',
    role: 'customer',
    avatar: 'https://placehold.co/100x100?text=JP',
    phone: '+5491155555559',
    createdAt: new Date('2023-11-05'),
    status: 'active',
  },
  {
    id: 6,
    email: 'laura@email.com',
    password: 'hashed',
    name: 'Laura Rodríguez',
    role: 'customer',
    avatar: 'https://placehold.co/100x100?text=LR',
    phone: '+5491155555560',
    createdAt: new Date('2023-12-01'),
    status: 'active',
  },
];
