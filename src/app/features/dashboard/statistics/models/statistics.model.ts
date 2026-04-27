export interface DailySale {
  date: Date;
  revenue: number;
  orders: number;
}

export interface CategorySale {
  category: string;
  total: number;
  percentage: number;
}

export interface StatisticsData {
  dailySales: DailySale[];
  categorySales: CategorySale[];
  topProducts: TopProduct[];
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
}

export interface TopProduct {
  id: number;
  title: string;
  sales: number;
  revenue: number;
}

export const MOCK_STATISTICS: StatisticsData = {
  dailySales: [
    { date: new Date('2024-01-15'), revenue: 1250, orders: 15 },
    { date: new Date('2024-01-16'), revenue: 980, orders: 12 },
    { date: new Date('2024-01-17'), revenue: 1450, orders: 18 },
    { date: new Date('2024-01-18'), revenue: 1100, orders: 14 },
    { date: new Date('2024-01-19'), revenue: 1680, orders: 20 },
    { date: new Date('2024-01-20'), revenue: 890, orders: 11 },
    { date: new Date('2024-01-21'), revenue: 1320, orders: 16 },
  ],
  categorySales: [
    { category: 'Ramos', total: 4500, percentage: 35 },
    { category: 'Arreglos', total: 3200, percentage: 25 },
    { category: 'Box de Flores', total: 2580, percentage: 20 },
    { category: 'Orquídeas', total: 1540, percentage: 12 },
    { category: 'Otros', total: 980, percentage: 8 },
  ],
  topProducts: [
    { id: 1, title: 'Ramo Premium Rosas', sales: 45, revenue: 4050 },
    { id: 2, title: 'Bouquet de Primavera', sales: 38, revenue: 3420 },
    { id: 3, title: 'Arreglo Elegante', sales: 32, revenue: 2880 },
    { id: 4, title: 'Caja de Orquídeas', sales: 28, revenue: 2520 },
    { id: 5, title: 'Ramo Simple', sales: 25, revenue: 1250 },
  ],
  totalRevenue: 12500,
  totalOrders: 156,
  avgOrderValue: 80,
  conversionRate: 3.2,
};