export interface InventoryProduct {
  id: number;
  title: string;
  sku: string;
  price: number;
  stock: number;
  sold: number;
  created: Date;
  category: string;
  status: 'active' | 'low_stock' | 'out_of_stock';
  image: string;
}

export interface InventorySummary {
  totalProducts: number;
  totalSold: number;
  totalCreated: number;
  lowStock: number;
  outOfStock: number;
}

export const MOCK_INVENTORY: InventoryProduct[] = [
  {
    id: 1,
    title: 'Ramo de Rosas Rojas',
    sku: 'RAMO-ROJAS',
    price: 85,
    stock: 25,
    sold: 156,
    created: new Date('2024-01-15'),
    category: 'Ramos',
    status: 'active',
    image: 'https://placehold.co/100x100/8A2846/white?text=Rosas',
  },
  {
    id: 2,
    title: 'Bouquet Primavera',
    sku: 'BOU-PRIMAVERA',
    price: 120,
    stock: 15,
    sold: 89,
    created: new Date('2024-02-20'),
    category: 'Bouquets',
    status: 'active',
    image: 'https://placehold.co/100x100/F5E6E8/8A2846?text=Primavera',
  },
  {
    id: 3,
    title: 'Orquídea Phalaenopsis',
    sku: 'ORQ-PHAL',
    price: 250,
    stock: 5,
    sold: 42,
    created: new Date('2023-11-10'),
    category: 'Orquídeas',
    status: 'low_stock',
    image: 'https://placehold.co/100x100/9C27B0/white?text=Orquídea',
  },
  {
    id: 4,
    title: 'Caja de Girasoles',
    sku: 'CAJA-GIRASOL',
    price: 95,
    stock: 0,
    sold: 78,
    created: new Date('2024-03-05'),
    category: 'Cajas',
    status: 'out_of_stock',
    image: 'https://placehold.co/100x100/FFC107/333?text=Girasoles',
  },
  {
    id: 5,
    title: 'Arreglo Floral Premium',
    sku: 'ARREGLO-PREM',
    price: 350,
    stock: 8,
    sold: 23,
    created: new Date('2024-01-20'),
    category: 'Arreglos',
    status: 'low_stock',
    image: 'https://placehold.co/100x100/E91E63/white?text=Premium',
  },
  {
    id: 6,
    title: 'Ramo de Tulipanes',
    sku: 'RAMO-TULIPAN',
    price: 65,
    stock: 30,
    sold: 112,
    created: new Date('2024-03-15'),
    category: 'Ramos',
    status: 'active',
    image: 'https://placehold.co/100x100/E91E63/white?text=Tulipanes',
  },
  {
    id: 7,
    title: 'Corona de Lirios',
    sku: 'CORONA-LIRIOS',
    price: 180,
    stock: 12,
    sold: 34,
    created: new Date('2023-06-01'),
    category: 'Coronas',
    status: 'active',
    image: 'https://placehold.co/100x100/9C27B0/white?text=Lirios',
  },
  {
    id: 8,
    title: 'Rosa Ecuador Premium',
    sku: 'ROSA-ECUADOR',
    price: 45,
    stock: 0,
    sold: 234,
    created: new Date('2023-09-15'),
    category: 'Rosas',
    status: 'out_of_stock',
    image: 'https://placehold.co/100x100/8A2846/white?text=Rosa+EC',
  },
];

export const getInventorySummary = (products: InventoryProduct[]): InventorySummary => {
  return {
    totalProducts: products.length,
    totalSold: products.reduce((acc, p) => acc + p.sold, 0),
    totalCreated: products.length,
    lowStock: products.filter(p => p.status === 'low_stock').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
  };
};