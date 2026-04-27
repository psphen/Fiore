export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  type: 'order' | 'delivery' | 'meeting' | 'note';
  description?: string;
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: 'Entrega - María García',
    date: new Date('2024-01-15'),
    type: 'delivery',
    description: 'Ramo de Rosas x2',
  },
  {
    id: 2,
    title: 'Reunión Proveedor',
    date: new Date('2024-01-18'),
    type: 'meeting',
    description: 'Nueva selección de flores',
  },
  {
    id: 3,
    title: 'Nota: Pedido Especial',
    date: new Date('2024-01-20'),
    type: 'note',
    description: 'Bodas temporada alta',
  },
  {
    id: 4,
    title: 'Entrega - Carlos López',
    date: new Date('2024-01-22'),
    type: 'delivery',
    description: 'Orquídeas',
  },
  {
    id: 5,
    title: 'Orden #42',
    date: new Date('2024-01-25'),
    type: 'order',
    description: 'Bouquet Premium',
  },
];