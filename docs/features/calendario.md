# Fiore — Calendar

## Metadata

```yaml
---
module: calendar
path: /dashboard/calendar
status: planned
priority: low
owner: 
lastUpdated: 2026-04-22
---
```

## Descripción

Calendario de eventos: entregas programadas, citas, recordatorios.

## User Stories

### Como admin
 yo quiero ver un calendario con todos los eventos
 para planificar mi día

### Como admin
 yo quiero agregar eventos
 para recordatorios y entregas

## Estructura de Rutas

| Path | Componente |
|------|------------|
| `/dashboard/calendar` | CalendarComponent |
| `/dashboard/calendar/create` | EventFormComponent |

## Eventos

- Entregas programadas
- Citas con proveedores
- Recordatorios de stock
- Eventos especiales (San Valentin, Dia de la Madre)

## Modelo

```typescript
export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  type: 'delivery' | 'appointment' | 'reminder' | 'special';
  date: Date;
  time?: string;
  isAllDay: boolean;
  color?: string;
}
```

## API

| Método | Endpoint |
|--------|---------|
| GET | `/api/v1/calendar/events` |
| POST | `/api/v1/calendar/events` |
| PUT | `/api/v1/calendar/events/:id` |
| DELETE | `/api/v1/calendar/events/:id` |