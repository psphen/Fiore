export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  rating: number;
}

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: 'Flores del Valle',
    contact: 'Pedro Sánchez',
    email: 'pedro@floresdelvalle.com',
    phone: '+5491155555601',
    address: 'Av. Principal 123, Buenos Aires',
    category: 'Ramos',
    status: 'active',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Jardín Floral',
    contact: 'María González',
    email: 'maria@jardinfloral.com',
    phone: '+5491155555602',
    address: 'Calle Flores 456, Buenos Aires',
    category: 'Orquídeas',
    status: 'active',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Cultivos del Norte',
    contact: 'Lucas García',
    email: 'lucas@cultivosdelnorte.com',
    phone: '+5491155555603',
    address: 'Ruta 5km, Northern',
    category: 'Tropicales',
    status: 'active',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Eco Flowers',
    contact: 'Ana López',
    email: 'ana@ecoflowers.com',
    phone: '+5491155555604',
    address: 'Av. Verde 789, Buenos Aires',
    category: 'Orgánicos',
    status: 'inactive',
    rating: 4.0,
  },
  {
    id: 5,
    name: 'Rosa Ecuatoriana',
    contact: 'Carlos Mendoza',
    email: 'carlos@rosaec.com',
    phone: '+5491155555605',
    address: 'Importaciones, Ecuador',
    category: 'Rosas',
    status: 'active',
    rating: 4.7,
  },
];