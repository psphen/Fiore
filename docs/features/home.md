# Fiore — Dashboard Home

## Metadata

```yaml
---
module: home
path: /dashboard/home
status: in-progress
priority: high
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

El dashboard principal muestra un resumen ejecutivo de toda la aplicación. Presenta métricas clave, calendario integrado, categorías trending y vistas rápidas de productos más vendidos.

## User Stories

### Como admin
 yo quiero ver un resumen visual de mi florería
 para tener una visión general del negocio sin necesidad de navegar a cada sección

### Como admin
 yo quiero acceder rápidamente a las funciones más usadas
 para mejorar mi productividad

## Funcionalidades

### 1. Stats Cards (Métricas)

**Descripción**: Muestra las 4 métricas principales del negocio

**Métricas sugeridas**:
- **Ventas del día**: Total de ventas realizadas hoy
- **Pedidos pendientes**: Órdenes que necesitan atención
- **Productos activos**: Total de productos en catálogo
- **Ingresos del mes**: Total de ingresos en el mes actual

**Comportamiento**:
- Click en card → Navega al módulo correspondiente
- Hover → Elevación sutil

### 2. Calendario

**Descripción**: Widget de calendario mensual integrado

**Comportamiento**:
- Muestra el mes actual por defecto
- Días con eventos muestran indicador (dot)
- Click en día → Muestra eventos de ese día en tooltip/popover
- Navegación entre meses

### 3. Categorías Trending

**Descripción**: Top 5 categorías más populares ordenadas por ventas

**Comportamiento**:
- Muestra nombre, icono y número de productos
- Click → Navega a la categoría

### 4. Productos Más Vendidos

**Descripción**: Top 5 productos con mayor cantidad de ventas

**Comportamiento**:
- Muestra imagen thumbnail, nombre, precio
- Click → Navega al detalle del producto

### 5. Órdenes Recientes

**Descripción**: Lista de las últimas 5 órdenes

**Comportamiento**:
- Muestra ID, cliente, total, estado
- Click → Navega al detalle de la orden

## Estados

| Estado | Descripción |
|--------|-------------|
| **Loading** | Skeleton loading para stats y listas |
| **Error** | Mensaje de error con botón de retry |
| **Success** | Dashboard completo con todos los widgets |

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Header: "Dashboard" + fecha actual                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Ventas   │ │ Pendientes│ │ Productos│ │ Ingresos │       │
│  │  $1,250  │ │    12    │ │   156    │ │ $45,000  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├────────────────────────────┬────────────────────────────────┤
│  Calendario                 │  Categorías Trending           │
│  ┌────────────────────┐    │  ┌────────────────────────┐   │
│  │    Abril 2026      │    │  │ 🌹 Rosas          45   │   │
│  │ Lu Ma Mi Ju Vi SaDo│    │  │ 🌻 Girasoles      32   │   │
│  │        1  2  3  4  5│    │  │ 🌷 Tulipanes      28   │   │
│  │ ...                 │    │  │ ...                   │   │
│  └────────────────────┘    │  └────────────────────────┘   │
├────────────────────────────┼────────────────────────────────┤
│  Productos Más Vendidos     │  Órdenes Recientes            │
│  ┌────────────────────┐    │  ┌────────────────────────┐   │
│  │ [img] Rosa Roja    │    │  │ #1234 - Juan - $150    │   │
│  │ [img] Tulipán Amar.│    │  │ #1233 - María - $85   │   │
│  └────────────────────┘    │  └────────────────────────┘   │
└────────────────────────────┴────────────────────────────────┘
```

## Componentes a Implementar

| Componente | Descripción |
|------------|-------------|
| `stats-card` | Card genérica para métricas |
| `calendar-widget` | Widget de calendario |
| `trending-categories` | Lista de categorías |
| `top-products` | Lista de productos top |
| `recent-orders` | Lista de órdenes recientes |

## API Endpoints

| Método | Endpoint | Descripción | Response |
|--------|----------|-------------|----------|
| GET | `/api/v1/stats/dashboard` | Métricas generales | `DashboardStats` |
| GET | `/api/v1/categories/trending` | Top categorías | `Category[]` |
| GET | `/api/v1/products/top` | Productos más vendidos | `Product[]` |
| GET | `/api/v1/orders/recent` | Órdenes recientes | `Order[]` |

## Model

```typescript
export interface DashboardStats {
  todaySales: number;
  pendingOrders: number;
  activeProducts: number;
  monthlyRevenue: number;
  todaySalesChange: number;  // porcentaje vs ayer
  pendingOrdersChange: number;
  activeProductsChange: number;
  monthlyRevenueChange: number;
}

export interface CalendarEvent {
  date: string;
  type: 'order' | 'delivery' | 'appointment';
  title: string;
}
```

## Dependencias

- Servicio: `StatsService` (por crear en `core/services/`)
- Componentes shared: ButtonSecondary
- Librería de calendario: FullCalendar o similar (o custom)

## Notas

- Los datos de stats se refresh cada 5 minutos
- El calendario muestra eventos del mes actual y siguiente
- Los colores de estado en órdenes usan los badges definidos en `docs/design/components.md`