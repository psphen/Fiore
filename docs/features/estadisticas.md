# Fiore — Statistics

## Metadata

```yaml
---
module: statistics
path: /dashboard/statistics
status: planned
priority: medium
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Panel de estadísticas y reportes. Gráficos de ventas, productos más vendidos, ingresos por período.

## User Stories

### Como admin
 yo quiero ver gráficos de ventas
 para entender el rendimiento del negocio

### Como admin
 yo quiero exportar reportes
 para分享con mi equipo

## Vistas

### Dashboard de estadísticas

**Gráficos**:
- Ventas por día (línea)
- Ventas por categoría (pie/donut)
- Productos más vendidos (barras)
- Ingresos por mes (línea)

**Filtros de período**:
- Hoy
- Esta semana
- Este mes
- Este año
- Personalizado

## Stats Principales

- Ventas totales
- Ingresos totales
- Clientes nuevos
- Ticket promedio

## API

| Método | Endpoint |
|--------|---------|
| GET | `/api/v1/statistics/sales` |
| GET | `/api/v1/statistics/top-products` |
| GET | `/api/v1/statistics/by-category` |

## Dependencias

- Chart library (Chart.js)