# Fiore — Módulo Orders

## Metadata

```yaml
---
module: orders
path: /dashboard/orders
status: planned
priority: high
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Gestión completa de órdenes del sistema. Permite visualizar, filtrar, actualizar y gestionar todas las órdenes de la florería.

## User Stories

### Como admin
 yo quiero ver todas las órdenes del sistema
 para controlar el estado de cada venta

### Como admin
 yo quiero filtrar órdenes por estado, fecha, cliente
 para encontrar rápidamente lo que necesito

### Como admin
 yo quiero actualizar el estado de una orden
 para mantener informado al cliente sobre su pedido

## Estructura de Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/dashboard/orders` | OrdersComponent | Lista de órdenes |
| `/dashboard/orders/:id` | OrderDetailComponent | Detalle de orden |
| `/dashboard/orders/create` | OrderFormComponent | Crear orden manual |

## Vistas

### Vista: Lista (index)

**URL**: `/dashboard/orders`

**Elementos UI**:
- Header: "Órdenes" + selector de período (día/semana/mes)
- Filtros:
  - Estado (todos, pendiente, procesamiento, enviado, entregado, cancelado)
  - Fecha (rango)
  - Cliente (búsqueda)
  - Total (rango)
- Tabla con columnas:
  - ID Orden
  - Cliente
  - Fecha
  - Total
  - Estado (badge)
  - Acciones
- Paginación (20 por página)
- Resumen/stats: total vendido, cantidad de órdenes

### Vista: Detalle

**URL**: `/dashboard/orders/:id`

**Elementos UI**:
- Breadcrumb: Home > Órdenes > #1234
- Info de la orden:
  - ID, fecha, estado
  - Datos del cliente
  - Datos de envío
  - Método de pago
- Lista de productos:
  - Imagen thumbnail
  - Nombre
  - Cantidad
  - Precio unitario
  - Subtotal
- Total de la orden
- Timeline de estados:
  - Pendiente → Procesando → Enviado → Entregado
- Acciones:
  - Cambiar estado
  - Imprimir factura
  - Cancelar orden

### Vista: Crear Orden

**URL**: `/dashboard/orders/create`

**Elementos UI**:
- Selector de cliente
- Buscador de productos
- Tabla de productos seleccionados
- Cantidad por producto
- Notas
- Total calculado
- Guardar / Cancelar

## Estados de Orden

| Estado | Descripción | Badge Color |
|--------|-------------|------------|
| `pendiente` | Orden creada, esperando pago | yellow |
| `procesando` | Pago confirmado, preparando | blue |
| `enviado` | En camino | purple |
| `entregado` | Entregado al cliente | green |
| `cancelado` | Orden cancelada | red |

## Flujo de Estados

```
pendiente → procesando → enviado → entregado
    ↓           ↓           ↑
  cancelado   cancelado   cancelado
```

## Modelo de Datos

```typescript
export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customer: User;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: number;
  product: Product;
  quantity: number;
  price: number;
  subtotal: number;
}

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia';
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/orders` | Listar (con filtros) |
| GET | `/api/v1/orders/:id` | Obtener por ID |
| POST | `/api/v1/orders` | Crear orden |
| PUT | `/api/v1/orders/:id` | Actualizar orden |
| PATCH | `/api/v1/orders/:id/status` | Actualizar estado |
| DELETE | `/api/v1/orders/:id` | Cancelar orden |

## Filtros de Lista

| Filtro | Tipo | Opciones |
|--------|------|----------|
|Estado|select|todos, pendiente, procesando, enviado, entregado, cancelado|
|Fecha|date-range|picker con ini/fin|
|Cliente|search|autocomplete por nombre|
|Total|range|min - max|

## Stats del Módulo

- Órdenes del día
- Órdenes pendientes
- Ingresos del día
- Ticket promedio

## Dependencias

- Servicio: `OrdersService` en `core/services/`
- Modelos: `Order`, `OrderItem`, `OrderStatus`
- Componentes shared: `ButtonSecondary`, badges, tabla

## Notas

- El número de orden debe seguir formato: `FI-YYYYMMDD-XXXX`
- Al cambiar estado, registrar timestamp en historial
- Notificaciones push al cliente al cambiar estado