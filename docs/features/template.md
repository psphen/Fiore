# Fiore — Feature Template

## Metadata

```yaml
---
module: NOMBRE_DEL_MODULO
path: /dashboard/nombre-modulo
status: planned | in-progress | completed
priority: high | medium | low
owner: 
lastUpdated: YYYY-MM-DD
---
```

## Descripción

Breve descripción de qué hace este módulo y cuál es su propósito en el sistema.

## User Stories

### Como [tipo de usuario]
 yo quiero [acción]
 para [beneficio]

### Como admin
 yo quiero poder ver todas las órdenes del sistema
 para tener control sobre las entregas y gestionar el inventario

## Funcionalidades

### 1. Nombre de Funcionalidad

**Descripción**: Qué hace esta funcionalidad

**Flujo de usuario**:
1. El usuario accede a la sección
2. Ve una lista/grid de elementos
3. Puede filtrar/buscar
4. Puede realizar acciones (crear, editar, eliminar)

**Casos de uso**:
- UC-001: Ver lista de elementos
- UC-002: Filtrar por...
- UC-003: Crear nuevo elemento
- UC-004: Editar elemento existente
- UC-005: Eliminar elemento

### 2. Otra Funcionalidad

...

## Estados

| Estado | Descripción | Comportamiento Visual |
|--------|-------------|----------------------|
| **Loading** | Cargando datos | Spinner + skeleton |
| **Empty** | No hay datos | Mensaje + CTA para crear |
| **Error** | Error al cargar | Mensaje de error + retry |
| **Success** | Datos cargados | Lista/Grid con datos |

## Vistas/Páginas

### Vista: Lista

**URL**: `/dashboard/modulo`
**Componente**: `modulo.component.ts`

**Elementos UI**:
- Header con título y botón crear
- Filtros/búsqueda
- Tabla/lista de elementos
- Paginación
- Empty state cuando no hay datos

### Vista: Detalle

**URL**: `/dashboard/modulo/:id`
**Componente**: `modulo-detail.component.ts`

**Elementos UI**:
- Breadcrumb
- Información del elemento
- Acciones (editar, eliminar)
- Historial/relaciones

### Vista: Formulario

**URL**: `/dashboard/modulo/create` o `/dashboard/modulo/edit/:id`
**Componente**: `modulo-form.component.ts`

**Elementos UI**:
- Breadcrumb
- Campos del formulario
- Validación en tiempo real
- Botones guardar/cancelar

## API Endpoints

| Método | Endpoint | Descripción | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/v1/modulo` | Listar | Query params | `Modulo[]` |
| GET | `/api/v1/modulo/:id` | Detalle | Path id | `Modulo` |
| POST | `/api/v1/modulo` | Crear | `CreateModuloDTO` | `Modulo` |
| PUT | `/api/v1/modulo/:id` | Actualizar | `UpdateModuloDTO` | `Modulo` |
| DELETE | `/api/v1/modulo/:id` | Eliminar | Path id | `204` |

## Model/Interface

```typescript
export interface Modulo {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export type CreateModuloDTO = Omit<Modulo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateModuloDTO = Partial<CreateModuloDTO>;
```

## Validación

| Campo | Reglas | Mensaje de Error |
|-------|--------|------------------|
| name | Required, min 3, max 100 | "El nombre es requerido" |
| description | Optional, max 500 | "La descripción no puede superar 500 caracteres" |
| status | Required, enum | "Selecciona un estado válido" |

## Dependencias

- Servicio: `ModuloService` en `core/services/`
- Guard: Si necesita auth/admin
- Componentes shared: ButtonSecondary, NotFound

## Notas

- Consideraciones especiales
- Decisiones de diseño
- Limitaciones conocidas