# Fiore — Módulo Products

## Metadata

```yaml
---
module: products
path: /dashboard/product
status: planned
priority: high
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

CRUD completo de productos. Gestión del catálogo de flores y arreglos de la floristería.

## User Stories

### Como admin
 yo quiero agregar nuevos productos al catálogo
 para que los clientes puedan comprarlos

### Como admin
 yo quiero editar la información de un producto
 para mantener los datos actualizados

### Como admin
 yo quiero eliminar productos del catálogo
 para quitar los que ya no se venden

## Estructura de Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/dashboard/product` | ProductsComponent | Lista de productos |
| `/dashboard/product/create` | ProductFormComponent | Crear producto |
| `/dashboard/product/edit/:id` | ProductFormComponent | Editar producto |
| `/dashboard/product/:id` | ProductDetailComponent | Ver producto |

## Vistas

### Vista: Lista (index)

**URL**: `/dashboard/product`

**Elementos UI**:
- Header: "Productos" + botón "Nuevo Producto"
- Filtros:
  - Categoría (select)
  - Estado (activo/inactivo)
  - Búsqueda (nombre)
  - Rango de precio
- Tabla con columnas:
  - Imagen thumbnail
  - Nombre
  - Categoría
  - Precio
  - Stock
  - Estado (badge)
  - Acciones (editar, eliminar)
- Paginación
- Vista grid/list toggle

### Vista: Formulario (create/edit)

**URL**: `/dashboard/product/create` o `/dashboard/product/edit/:id`

**Campos**:
- Nombre* (text, required, 3-100 chars)
- Slug* (auto-generado, editable)
- Descripción* (textarea, required, max 1000)
- Precio* (number, required, min 0)
- Categoría* (select, required)
- Imágenes* (multi-upload, min 1, max 5)
- Stock (number, min 0)
- Estado* (toggle ACTIVO/inactivo)
- Destacado (toggle)
- Precio oferta (number, optional)

### Vista: Detalle

**URL**: `/dashboard/product/:id`

**Elementos UI**:
- Imagen principal grande
- Galeria de imágenes
- Información del producto
- Stock actual
- Enlaces a editar/eliminar

## Modelo de Datos

```typescript
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

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products` | Listar (con filtros) |
| GET | `/api/v1/products/:id` | Obtener por ID |
| POST | `/api/v1/products` | Crear |
| PUT | `/api/v1/products/:id` | Actualizar |
| DELETE | `/api/v1/products/:id` | Eliminar |
| PATCH | `/api/v1/products/:id/toggle-featured` | Toggle destacado |

## Validación

| Campo | Reglas | Mensaje |
|-------|-------|--------|
| title | required, 3-100 | "El nombre es requerido (3-100 caracteres)" |
| description | required, max 1000 | "La descripción no puede superar 1000 caracteres" |
| price | required, min 0 | "El precio debe ser mayor a 0" |
| categoryId | required | "Selecciona una categoría" |
| images | required, min 1 | "Agrega al menos una imagen" |

## Estados

| Estado | Descripción | Badge |
|--------|-------------|-------|
| `activo` | Visible en tienda | green |
| `inactivo` | No visible | gray |

## Features

- **Slug auto-generado**: Crear desde título, editable
- **Multi-upload**: Arrastrar imágenes, reordering
- **Preview**: Ver cómo queda en tienda
- **Stock warning**: Alerta cuando stock < 5
- **Duplicar**: Crear copia de producto existente

## Dependencias

- Servicio: `ProductService` en `core/services/`
- Módulo categorías (para selector)
- Upload de imágenes (Firebase Storage)

## Notas

- Imágenes optimizadas a 800x800px
- Primera imagen = thumbnail principal
- SEO: Meta description auto-generado desde descripción