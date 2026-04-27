# Fiore — Módulo Categories

## Metadata

```yaml
---
module: categories
path: /dashboard/category
status: planned
priority: high
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

CRUD de categorías para organizar los productos del catálogo.

## User Stories

### Como admin
 yo quiero crear categorías para organizar mis productos
 para que los clientes encuentren fácilmente lo que buscan

### Como admin
 yo quiero editar categorías
 para mantener la organización actualizada

### Como admin
 yo quiero eliminar categorías
 para清理 productos sin categoría

## Estructura de Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/dashboard/category` | CategoriesComponent | Lista de categorías |
| `/dashboard/category/create` | CategoryFormComponent | Crear categoría |
| `/dashboard/category/edit/:id` | CategoryFormComponent | Editar categoría |

## Vistas

### Vista: Lista (index)

**URL**: `/dashboard/category`

**Elementos UI**:
- Header: "Categorías" + botón "Nueva Categoría"
- Lista de categorías:
  - Icono
  - Nombre
  - Slug
  - Cantidad de productos
  - Estado
  - Acciones
- Árbol jerárquico si hay subcategorías

### Vista: Formulario (create/edit)

**Campos**:
- Nombre* (text, required)
- Slug* (auto-generado, editable)
- Descripción (textarea, optional)
- Icono (selector de FontAwesome)
- Imagen (optional, para banner)
- Categoría padre (select, para jerarquía)
- Estado* (toggle)

## Modelo de Datos

```typescript
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;        // FontAwesome icon name
  image?: string;      // URL a imagen
  parentId?: number;  // Para subcategorías
  isActive: boolean;
  productCount?: number; // Calculado
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategoryDTO = Omit<Category, 'id' | 'slug' | 'productCount' | 'createdAt' | 'updatedAt'>;
export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/categories` | Listar |
| GET | `/api/v1/categories/tree` | Árbol jerárquico |
| GET | `/api/v1/categories/:id` | Por ID |
| POST | `/api/v1/categories` | Crear |
| PUT | `/api/v1/categories/:id` | Actualizar |
| DELETE | `/api/v1/categories/:id` | Eliminar |

## Validación

| Campo | Reglas | Mensaje |
|-------|-------|--------|
| name | required, 2-50 | "El nombre es requerido" |
| slug | required, unique | "El slug ya existe" |

## Categorías Default (seed)

- Rosas
- Girasoles
- Tulipanes
- Orquídeas
- Arreglos Florales
- Ramos
- Centros de Mesa
- Bodas y Eventos
- Condolencias

## Dependencias

- Servicio: `CategoryService`
- Componente icon picker
- FontAwesome

## Notas

- No eliminar si tiene productos asociados (avisar)
- Slug único en toda la tabla
- Icono default = `faFlower` si no se selecciona