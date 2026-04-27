---
name: orders
description: >
  Domain knowledge for the Fiore Orders module. Order model, status state machine, API endpoints, and business rules.
  Trigger: When working on the orders module at /dashboard/orders — listing, viewing, or managing order status.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Working on any file inside `src/app/features/dashboard/orders/`
- Generating order-related components, services, or models
- Implementing order status changes or order detail views

---

## Domain Context

Orders are the transactions generated when a customer completes a purchase. The admin views, filters, and updates order statuses. Orders CANNOT be created from scratch by the admin in the normal flow — only customers create orders. The admin can create manual orders (e.g., phone orders).

---

## Model

```typescript
// src/app/features/dashboard/orders/models/order.model.ts

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customer: User;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateOrderDTO = {
  customerId: number;
  items: Array<{ productId: number; quantity: number }>;
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
};

export type UpdateOrderStatusDTO = {
  status: OrderStatus;
};
```

---

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/dashboard/orders` | `Orders` (page) | Orders list with filters |
| `/dashboard/orders/:id` | `OrderDetail` | Full order detail + status timeline |
| `/dashboard/orders/create` | `OrderForm` | Create manual order |

Route constant: `ORDERS_ROUTES`

---

## API Endpoints

Base URL: `/api/v1/orders`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/orders` | List all (accepts `?status`, `?from`, `?to`, `?customerId`) |
| GET | `/api/v1/orders/:id` | Get by ID |
| POST | `/api/v1/orders` | Create manual order |
| PATCH | `/api/v1/orders/:id/status` | Update order status |

---

## Status State Machine

```
pendiente → procesando → enviado → entregado
    ↓            ↓
 cancelado    cancelado
```

**Allowed transitions:**

| From | Can go to |
|------|-----------|
| `pendiente` | `procesando`, `cancelado` |
| `procesando` | `enviado`, `cancelado` |
| `enviado` | `entregado` |
| `entregado` | — (terminal) |
| `cancelado` | — (terminal) |

The UI must only show valid next-state buttons based on current status.

---

## Status Badges

| Status | Badge classes | Label |
|--------|--------------|-------|
| `pendiente` | `bg-yellow-100 text-yellow-600` | Pendiente |
| `procesando` | `bg-blue-100 text-blue-600` | Procesando |
| `enviado` | `bg-purple-100 text-purple-600` | Enviado |
| `entregado` | `bg-green-100 text-green-600` | Entregado |
| `cancelado` | `bg-red-100 text-red-500` | Cancelado |

---

## Filter State (list page)

```typescript
protected readonly filterStatus = signal<OrderStatus | 'all'>('all');
protected readonly searchCustomer = signal('');
protected readonly dateFrom = signal<string | null>(null);
protected readonly dateTo = signal<string | null>(null);
protected readonly period = signal<'day' | 'week' | 'month'>('day');
```

---

## Order Detail Page Requirements

The detail page must show:
1. Order header: ID, date, current status badge
2. Customer information: name, email, phone
3. Shipping address
4. Payment method
5. Products table: image thumbnail, name, quantity, unit price, subtotal
6. Order total
7. Status timeline (visual stepper showing progression)
8. Action buttons for valid state transitions
9. "Imprimir factura" button

---

## Business Rules

- A `cancelado` or `entregado` order CANNOT change status — disable action buttons
- When changing to `enviado`, a tracking number should be capturable (optional field)
- Orders table paginates at 20 per page
- The list page shows summary stats at the top: total sold (period), orders count (period)
- `total` is always calculated server-side — never recalculate on client

---

## References

- Feature spec: [docs/features/ordenes.md](../../docs/features/ordenes.md)
- Angular patterns: [skills/angular-patterns/SKILL.md](../angular-patterns/SKILL.md)
- Design system: [skills/fiore-design-system/SKILL.md](../fiore-design-system/SKILL.md)
