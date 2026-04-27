# Fiore — Profile

## Metadata

```yaml
---
module: profile
path: /dashboard/profile
status: planned
priority: low
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Perfil del administrador. Información de la cuenta y configuración.

## User Stories

### Como admin
 yo quiero ver mi información de perfil
 para verificar mis datos

### Como admin
 yo quiero cambiar mi contraseña
 para mantener mi cuenta segura

## Estructura de Rutas

| Path | Componente |
|------|------------|
| `/dashboard/profile` | ProfileComponent |

## Secciones

### Información Personal

- Nombre
- Email
- Teléfono
- Avatar

### Seguridad

- Cambiar contraseña
- Configuración 2FA

### Configuración

- Notificaciones
- Preferencias

## Modelo

```typescript
export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
}
```

## API

| Método | Endpoint |
|--------|---------|
| GET | `/api/v1/profile` |
| PUT | `/api/v1/profile` |
| POST | `/api/v1/profile/password` |