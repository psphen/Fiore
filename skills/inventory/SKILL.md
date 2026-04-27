---
name: inventory
description: >
  Domain knowledge for the Fiore Inventory module. Stock management, movement tracking, alerts, and business rules.
  Trigger: When working on the inventory module at /dashboard/inventory — stock levels, movements, or adjustments.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Working on any file inside `src/app/features/dashboard/inventory/`
- Implementing stock alerts, movement history, or stock adjustments
- Adding inventory stats or low-stock warnings

---

## Domain Context

The inventory module controls stock levels for all products. It does NOT manage products themselves (that's the products module) — it manages quantities, tracks movements (entries/exits), and alerts when stock is low.

---

## Model

```typescript
// src/app/features/dashboard/inventory/models/inventory.model.ts

export type MovementType = 'entrada' | 'salida' | 'ajuste';
export type StockStatus = 'ok' | 'bajo' | 'critico' | 'sin-stock';

export interface InventoryItem {
  id: number;
  product: Product;
  currentStock: number;
  minStock: number;
  lastRestocked: Date;
  status: StockStatus;
}

export interface StockMovement {
  id: number;
  product: Product;
  type: MovementType;
  quantity: number;
  reason: string;
  createdAt: Date;
  createdBy: string;
}

export type AdjustStockDTO = {
  productId: number;
  type: MovementType;
  quantity: number;
  reason: string;
};
```

---

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/dashboard/inventory` | `Inventory` (page) | Main inventory table with stats |
| `/dashboard/inventory/movements` | `Movements` | Movement history log |
| `/dashboard/inventory/adjust` | `AdjustStock` | Manual stock adjustment form |

Route constant: `INVENTORY_ROUTES`

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/inventory` | All inventory items (accepts `?status`, `?category`) |
| GET | `/api/v1/inventory/:productId` | Single product inventory |
| GET | `/api/v1/inventory/movements` | Movement history |
| POST | `/api/v1/inventory/adjust` | Create stock adjustment |

---

## Stock Status Logic

Stock status is derived from `currentStock` vs `minStock`:

| Condition | Status | Badge |
|-----------|--------|-------|
| `currentStock === 0` | `sin-stock` | `bg-red-100 text-red-600` — "Sin stock" |
| `currentStock <= minStock` | `critico` | `bg-red-100 text-red-500` — "Crítico" |
| `currentStock <= minStock * 1.5` | `bajo` | `bg-orange-100 text-orange-600` — "Stock bajo" |
| `currentStock > minStock * 1.5` | `ok` | `bg-green-100 text-green-600` — "OK" |

**Default `minStock` for a new product: `10` units.**

---

## Stats Cards (Main Page)

The inventory main page MUST show 4 stats at the top:

| Stat | Description |
|------|-------------|
| Total en stock | Sum of all `currentStock` values |
| Productos bajo stock | Count of items with status `bajo` or `critico` |
| Sin stock | Count of items with status `sin-stock` |
| Valor total | Sum of (`currentStock * product.price`) |

```typescript
protected readonly totalStock = computed(() =>
  this.items().reduce((sum, i) => sum + i.currentStock, 0)
);

protected readonly lowStockCount = computed(() =>
  this.items().filter(i => i.status === 'bajo' || i.status === 'critico').length
);

protected readonly outOfStockCount = computed(() =>
  this.items().filter(i => i.status === 'sin-stock').length
);

protected readonly totalValue = computed(() =>
  this.items().reduce((sum, i) => sum + (i.currentStock * i.product.price), 0)
);
```

---

## Movement Types

| Type | Description | Stock effect |
|------|-------------|-------------|
| `entrada` | Stock received (purchase from supplier) | +quantity |
| `salida` | Stock removed (damage, expiry, loss) | -quantity |
| `ajuste` | Manual correction to set exact count | Sets to quantity |

---

## Filter State

```typescript
protected readonly filterStatus = signal<StockStatus | 'all'>('all');
protected readonly filterCategory = signal<number | null>(null);
protected readonly searchTerm = signal('');
```

---

## Business Rules

- A `salida` adjustment CANNOT exceed `currentStock` — validate before submitting
- `reason` is REQUIRED for all movements (free text, min 5 chars)
- The `adjustStock` form must show the current stock value before confirming
- The movement history is READ-ONLY — no editing or deleting movements
- Low stock items (`bajo`, `critico`, `sin-stock`) should appear at the TOP of the table

---

## References

- Feature spec: [docs/features/inventario.md](../../docs/features/inventario.md)
- Angular patterns: [skills/angular-patterns/SKILL.md](../angular-patterns/SKILL.md)
- Design system: [skills/fiore-design-system/SKILL.md](../fiore-design-system/SKILL.md)
