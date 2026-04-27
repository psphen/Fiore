# Fiore — Suppliers

## Metadata

```yaml
---
module: suppliers
path: /dashboard/suppliers
status: planned
priority: low
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Gestión de proveedores de flores y materiales.

## User Stories

### Como admin
 yo quiero registrar proveedores
 para tener contacto cuando necesite reposición

### Como admin
 yo quiero ver los productos de cada proveedor
 para comparar precios

## Estructura de Rutas

| Path | Componente |
|------|------------|
| `/dashboard/suppliers` | SuppliersComponent |
| `/dashboard/suppliers/:id` | SupplierDetailComponent |

## Modelo

```typescript
export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: string[];  // Productos que provee
  isActive: boolean;
}
```

## Vista: Lista

- Nombre
- Contacto
- Teléfono
- Productos que provee
- Estado
- Acciones

## API

| Método | Endpoint |
|--------|---------|
| GET | `/api/v1/suppliers` |
| POST | `/api/v1/suppliers` |
| PUT | `/api/v1/suppliers/:id` |
| DELETE | `/api/v1/suppliers/:id` |