# Fiore — Módulo Inventory

## Metadata

```yaml
---
module: inventory
path: /dashboard/inventory
status: planned
priority: high
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Control de inventario con alertas de stock bajo, histórico de movimientos y estadísticas.

## User Stories

### Como admin
 yo quiero ver el stock de todos mis productos
 para saber qué tengo disponible

### Como admin
 yo quiero recibir alertas cuando el stock está bajo
 para reponer a tiempo

### Como admin
 yo quiero registrar entradas y salidas de inventario
 para контроль el flujo de productos

## Estructura de Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/dashboard/inventory` | InventoryComponent | Vista principal |
| `/dashboard/inventory/movements` | MovementsComponent | Historial de movimientos |
| `/dashboard/inventory/adjust` | AdjustStockComponent | Ajustar stock |

## Vista Principal

### Elementos UI

**Stats Cards**:
- Total productos en stock
- Productos bajo stock (alerta)
- Productos sin stock (crítico)
- Valor total del inventario

**Tabla de stock**:
- Producto (imagen + nombre)
- Categoría
- Stock actual
- Stock mínimo (threshold)
- Estado (badge)
- Última renovación
- Acciones

**Filtros**:
- Categoría
- Estado (normal, bajo, sin stock)
- Búsqueda por nombre

## Estados de Stock

| Estado | Condición | Color | Significado |
|--------|----------|-------|-----------|
| `normal` | stock > min | green | Stock OK |
| `bajo` | stock <= min | yellow | Reponer pronto |
| `sin-stock` | stock = 0 | red | No disponible |

## Modelo de Datos

```typescript
export interface InventoryItem {
  productId: number;
  product: Product;
  currentStock: number;
  minStock: number;        // Threshold para alerta
  updatedAt: Date;
}

export interface StockMovement {
  id: number;
  productId: number;
  product: Product;
  type: MovementType;
  quantity: number;
  reason?: string;
  createdAt: Date;
  createdBy: string;
}

export type MovementType = 'entrada' | 'salida' | 'ajuste' | 'venta';
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/inventory` | Listar stock |
| GET | `/api/v1/inventory/low-stock` | Productos bajo mínimo |
| POST | `/api/v1/inventory/adjust` | Ajuste de stock |
| GET | `/api/v1/inventory/movements` | Historial |
| GET | `/api/v1/inventory/stats` | Estadísticas |

## Funcionalidades

### 1. Alertas de Stock Bajo

- Badge rojo cuando stock <= minStock
- Notificación al admin (email/push)
- Listado filtrado "Solo bajo stock"

### 2. Ajuste Manual

- Modal para cambiar stock manualmente
- Razón requerida
- Registrado en historial

### 3. Historial de Movimientos

- Tabla cronológica
- Filtro por tipo (entrada/salida/ajuste)
- Filtro por producto
- Filtro por fecha

### 4. Valor del Inventario

- Calculado: stock × precio costo
- Stats card principal

## Dependencias

- Servicio: `InventoryService`
- Skills: `inventory-management` (si aplica)

## Notas

- Default minStock = 10
- Al vender → automático decrement
- Al recibir pedido → registro entrada