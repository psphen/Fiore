# Fiore — Módulo Users

## Metadata

```yaml
---
module: users
path: /dashboard/users
status: planned
priority: medium
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Gestión de clientes/usuarios del sistema. Permite visualizar, buscar y administrar las cuentas de clientes.

## User Stories

### Como admin
 yo quiero ver todos los clientes registrados
 para tener un registro de mis compradores

### Como admin
 yo quiero buscar un cliente específico
 para atender快速的 su solicitud

### Como admin
 yo quiero ver el historial de compras de un cliente
 para conocer su comportamiento de compra

## Estructura de Rutas

| Path | Componente | Descripción |
|------|------------|-------------|
| `/dashboard/users` | UsersComponent | Lista de usuarios |
| `/dashboard/users/:id` | UserDetailComponent | Detalle del usuario |

## Vista: Lista

**Campos de la tabla**:
- Avatar
- Nombre completo
- Email
- Teléfono
- Total de compras
- Última compra
- Estado (activo/bloqueado)
- Acciones

**Filtros**:
- Estado (todos/activo/bloqueado)
- Fecha de registro (rango)
- Búsqueda (nombre/email)

## Vista: Detalle

**Información**:
- Datos personales
- Historial de órdenes
- Total invertido
- Fecha de registro
- Estado de cuenta

## Modelo

```typescript
export interface User {
  id: number;
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  ordersCount: number;
  totalSpent: number;
  isActive: boolean;
  createdAt: Date;
}
```

## Estados

| Estado | Badge |
|--------|-------|
| activo | green |
| bloqueado | red |

## API

| Método | Endpoint |
|--------|---------|
| GET | `/api/v1/users` |
| GET | `/api/v1/users/:id` |
| PATCH | `/api/v1/users/:id/toggle-status` |