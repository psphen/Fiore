export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export interface OrdersSummary {
  totalOrders: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenue: number;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    customerName: 'María García',
    customerEmail: 'maria@email.com',
    products: [
      { id: 1, title: 'Ramo de Rosas', quantity: 2, price: 45 },
      { id: 2, title: 'Girasoles', quantity: 1, price: 30 },
    ],
    total: 120,
    status: 'delivered',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 2,
    customerName: 'Carlos López',
    customerEmail: 'carlos@email.com',
    products: [
      { id: 3, title: 'Orquídeas', quantity: 1, price: 80 },
    ],
    total: 80,
    status: 'processing',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: 3,
    customerName: 'Ana Martínez',
    customerEmail: 'ana@email.com',
    products: [
      { id: 1, title: 'Ramo de Rosas', quantity: 1, price: 45 },
      { id: 4, title: 'Tulipanes', quantity: 3, price: 25 },
    ],
    total: 120,
    status: 'shipped',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: 4,
    customerName: 'Juan Pérez',
    customerEmail: 'juan@email.com',
    products: [
      { id: 5, title: 'Lirios', quantity: 2, price: 35 },
    ],
    total: 70,
    status: 'pending',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: 5,
    customerName: 'Laura Rodríguez',
    customerEmail: 'laura@email.com',
    products: [
      { id: 6, title: 'Bouquet Premium', quantity: 1, price: 150 },
    ],
    total: 150,
    status: 'cancelled',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: 6,
    customerName: 'Miguel Sánchez',
    customerEmail: 'miguel@email.com',
    products: [
      { id: 7, title: 'Arreglo Floral', quantity: 2, price: 60 },
    ],
    total: 120,
    status: 'delivered',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-14'),
  },
];

export const getOrdersSummary = (orders: Order[]): OrdersSummary => {
  return {
    totalOrders: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((acc, o) => acc + o.total, 0),
  };
};