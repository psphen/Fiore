---
name: products
description: >
  Domain knowledge for the Fiore Products module. Model definitions, API endpoints, validation rules, and business logic.
  Trigger: When working on the products module at /dashboard/product — creating, editing, or extending product features.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Working on any file inside `src/app/features/dashboard/product/`
- Generating product-related components, services, or models
- Adding product filtering, form fields, or business logic

---

## Domain Context

The products module is the core catalog of Fiore. Products are flowers, arrangements, and related items that customers browse and purchase in the public landing page.

---

## Model

```typescript
// src/app/features/dashboard/product/models/product.model.ts

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  offerPrice?: number;
  categoryId: number;
  category: Category;
  images: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductDTO = Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'category'> & {
  categoryId: number;
};

export type UpdateProductDTO = Partial<CreateProductDTO>;
```

---

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/dashboard/product` | `Product` (page) | Product list with filters |
| `/dashboard/product/create` | `ProductContainer` | Create product form |
| `/dashboard/product/edit/:id` | `ProductContainer` | Edit product form |
| `/dashboard/product/:id` | `ProductDetail` | View product detail |

Route constant: `PRODUCT_ROUTES`

---

## API Endpoints

Base URL: `/api/v1/products`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/products` | List all (accepts `?categoryId`, `?title`, `?price_min`, `?price_max`) |
| GET | `/api/v1/products/:id` | Get by ID |
| POST | `/api/v1/products` | Create |
| PUT | `/api/v1/products/:id` | Update |
| DELETE | `/api/v1/products/:id` | Delete |
| PATCH | `/api/v1/products/:id/toggle-featured` | Toggle featured flag |

---

## Form Fields & Validation

| Field | Type | Rules | Error message |
|-------|------|-------|---------------|
| `title` | text | required, 3–100 chars | "El nombre es requerido (3-100 caracteres)" |
| `description` | textarea | required, max 1000 | "La descripción no puede superar 1000 caracteres" |
| `price` | number | required, min 0.01 | "El precio debe ser mayor a 0" |
| `offerPrice` | number | optional, < price | "El precio oferta debe ser menor al precio normal" |
| `categoryId` | select | required | "Seleccioná una categoría" |
| `images` | multi-upload | required, min 1, max 5 | "Agregá al menos una imagen" |
| `stock` | number | min 0 | "El stock no puede ser negativo" |
| `isActive` | toggle | — | — |
| `isFeatured` | toggle | — | — |

---

## Status Badges

| Status | Badge classes |
|--------|--------------|
| Active (`isActive: true`) | `bg-green-100 text-green-600` |
| Inactive (`isActive: false`) | `bg-gray-100 text-gray-500` |
| Featured (`isFeatured: true`) | `bg-yellow-100 text-yellow-600` |
| Low stock (`stock < 10`) | `bg-orange-100 text-orange-600` |
| Out of stock (`stock === 0`) | `bg-red-100 text-red-500` |

---

## Filter State

The list page supports these filters (use signals):

```typescript
protected readonly filterCategory = signal<number | null>(null);
protected readonly filterStatus = signal<'all' | 'active' | 'inactive'>('all');
protected readonly searchTerm = signal('');
protected readonly priceMin = signal<number | null>(null);
protected readonly priceMax = signal<number | null>(null);
```

Filter logic must be client-side — apply after `getAll()` loads.

---

## Business Rules

- A product CANNOT be deleted if it has associated active orders — show error toast
- `slug` is auto-generated from `title` on the server — never send it in create/update DTOs
- `images` array must contain valid URLs (from file upload service)
- `offerPrice` must be strictly less than `price` if set
- Products with `stock === 0` should show "Sin stock" badge but remain visible in dashboard
- `isFeatured` products appear in the dashboard home "Productos Más Vendidos" widget

---

## Image Upload

Images go through the files service before being added to the product:

```typescript
// Use FilesService (core/services/files)
private filesService = inject(FilesService);

uploadImages(files: FileList) {
  // Upload each file and collect URLs
  // Then set URLs in the product form
}
```

---

## References

- Feature spec: [docs/features/productos.md](../../docs/features/productos.md)
- Angular patterns: [skills/angular-patterns/SKILL.md](../angular-patterns/SKILL.md)
- Design system: [skills/fiore-design-system/SKILL.md](../fiore-design-system/SKILL.md)
