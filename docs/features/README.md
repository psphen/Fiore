# Fiore — Feature Specifications

Documentación completa de features del proyecto.

## Índice de Features

### Landing Page (Pública)

| Módulo | Archivo | Estado |
|--------|--------|--------|
| Home | `public/home.md` | — |
| Login | `public/login.md` | — |
| Register | `public/register.md` | — |
| My Cart | `public/my-cart.md` | — |
| Product Detail | `public/product-detail.md` | — |

### Dashboard (Admin)

| Módulo | Archivo | Estado | Prioridad |
|--------|--------|--------|----------|
| **Home** | `features/home.md` | ✅ | alta |
| **Orders** | `features/ordenes.md` | ✅ | alta |
| **Products** | `features/productos.md` | ✅ | alta |
| **Categories** | `features/categorias.md` | ✅ | alta |
| **Inventory** | `features/inventario.md` | ✅ | alta |
| Users | `features/usuarios.md` | ✅ | media |
| Statistics | `features/estadisticas.md` | ✅ | media |
| Calendar | `features/calendario.md` | ✅ | baja |
| Suppliers | `features/proveedores.md` | ✅ | baja |
| Profile | `features/perfil.md` | ✅ | baja |

## Patrón Común

Todos los módulos de dashboard siguen:

```
/dashboard/{modulo}        → Lista con filtros
/dashboard/{modulo}/create → Formulario crear
/dashboard/{modulo}/edit/:id → Formulario editar
/dashboard/{modulo}/:id   → Detalle
```

## Design System

Consultar `docs/design/`:
- `colors.md` — Paleta rosa pastel #fff6fa
- `typography.md` — Open Sans
- `spacing.md` — Sistema de spacing
- `components.md` — Componentes UI

## Código

Consultar `AGENTS.md`:
- Patrones de código
- Convenciones
- Tech stack