---
name: fiore-design-system
description: >
  Fiore design tokens, Tailwind classes, component patterns and UI conventions.
  Trigger: When writing HTML templates, applying styles, using colors, or building UI components.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Writing any HTML template in the project
- Applying colors, spacing, or typography
- Building tables, cards, badges, buttons, or forms
- Replicating any UI pattern from existing modules

---

## Critical Rules

- ALWAYS use design tokens (`text-fiore-primary`) — NEVER raw hex values like `#8A2846`
- ALWAYS use `FaIconComponent` for icons — never emojis, never inline SVG, never other icon libs
- ALWAYS use `Open Sans` — it's loaded globally, no need to re-import in components
- Font size classes: `text-h1` through `text-caption` — see Typography below

---

## Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-fiore-bg` | `#fff6fa` | Page background |
| `bg-fiore-bg-alt` | `#fce4ec` | Cards, table headers |
| `bg-fiore-bg-dark` | `#f8bbd9` | Hover accents |
| `text-fiore-primary` | `#e91e63` | Primary actions, active links |
| `bg-fiore-primary` | `#e91e63` | Primary buttons |
| `hover:bg-fiore-primary-dark` | `#c2185b` | Primary button hover |
| `text-fiore-text` | `#1a1a2e` | Body text |
| `text-fiore-text-secondary` | `#6b7280` | Labels, metadata |
| `text-fiore-text-muted` | `#9ca3af` | Placeholders, hints |
| `border-fiore-border` | `#f0e6ea` | Soft borders |
| `border-fiore-border-dark` | `#d4c4cb` | Visible borders |

### Semantic states

| Token | Hex | Usage |
|-------|-----|-------|
| `text-green-600` / `bg-green-100` | — | Success, active, delivered |
| `text-yellow-600` / `bg-yellow-100` | — | Warning, pending |
| `text-red-500` / `bg-red-100` | — | Error, cancelled, danger |
| `text-blue-600` / `bg-blue-100` | — | Info, processing |
| `text-purple-600` / `bg-purple-100` | — | Shipped/en camino |
| `text-gray-500` / `bg-gray-100` | — | Inactive, disabled |

---

## Typography

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-display` | 48px | 800 | Hero titles |
| `text-h1` | 36px | 700 | Page titles |
| `text-h2` | 30px | 700 | Section titles |
| `text-h3` | 24px | 600 | Subtitles |
| `text-h4` | 20px | 600 | Card titles |
| `text-body-lg` | 18px | 400 | Long descriptions |
| `text-body` | 16px | 400 | General text |
| `text-body-sm` | 14px | 400 | Auxiliary text |
| `text-caption` | 12px | 500 | Labels, captions |
| `text-button` | 14px | 600 | Button text |

---

## Component Patterns

### Button — Primary

```html
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-fiore-primary text-white text-button hover:bg-fiore-primary-dark transition-all">
  <fa-icon [icon]="faPlus"></fa-icon>
  Crear
</button>
```

### Button — Secondary

```html
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-fiore-primary text-fiore-primary text-button hover:bg-fiore-bg-alt transition-all">
  Cancelar
</button>
```

### Button — Danger

```html
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-button hover:bg-red-600 transition-all">
  <fa-icon [icon]="faTrash"></fa-icon>
  Eliminar
</button>
```

### Badge / Status

```html
<!-- Active / Success -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-green-100 text-green-600">Activo</span>

<!-- Pending / Warning -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-yellow-100 text-yellow-600">Pendiente</span>

<!-- Cancelled / Error -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-red-100 text-red-500">Cancelado</span>

<!-- Processing / Info -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-blue-100 text-blue-600">Procesando</span>

<!-- Shipped -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-purple-100 text-purple-600">Enviado</span>

<!-- Inactive -->
<span class="px-2 py-1 rounded-full text-caption font-medium bg-gray-100 text-gray-500">Inactivo</span>
```

### Table (standard)

```html
<div class="overflow-x-auto rounded-lg shadow">
  <table class="w-full bg-white">
    <thead class="bg-fiore-bg-alt">
      <tr>
        <th class="px-4 py-3 text-left text-caption font-semibold text-fiore-text uppercase tracking-wider">Columna</th>
      </tr>
    </thead>
    <tbody>
      @for (item of items(); track item.id) {
        <tr class="border-b border-fiore-border hover:bg-gray-50 transition-colors">
          <td class="px-4 py-3 text-body-sm text-fiore-text">{{ item.name }}</td>
        </tr>
      }
      @if (items().length === 0) {
        <tr>
          <td colspan="99" class="px-4 py-10 text-center text-fiore-text-muted text-body-sm">
            No hay elementos para mostrar.
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

### Card

```html
<div class="bg-white p-4 rounded-xl shadow-sm border border-fiore-border">
  <h3 class="text-h4 text-fiore-text mb-2">Título</h3>
  <p class="text-body-sm text-fiore-text-secondary">Contenido</p>
</div>
```

### Stats Card (Dashboard)

```html
<div class="bg-white p-5 rounded-xl shadow-sm border border-fiore-border flex items-center gap-4">
  <div class="w-12 h-12 rounded-full bg-fiore-bg-alt flex items-center justify-center">
    <fa-icon [icon]="faIcon" class="text-fiore-primary text-xl"></fa-icon>
  </div>
  <div>
    <p class="text-caption text-fiore-text-secondary uppercase tracking-wide">Label</p>
    <p class="text-h3 text-fiore-text font-bold">{{ value }}</p>
  </div>
</div>
```

### Search input

```html
<div class="relative flex-1 max-w-md">
  <fa-icon [icon]="faSearch" class="absolute left-3 top-1/2 -translate-y-1/2 text-fiore-text-muted text-sm"></fa-icon>
  <input
    type="text"
    [value]="searchTerm()"
    (input)="onSearch($any($event.target).value)"
    placeholder="Buscar..."
    class="w-full pl-10 pr-4 py-2 text-body-sm border border-fiore-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fiore-primary focus:border-transparent"
  />
</div>
```

### Form field

```html
<div class="flex flex-col gap-1">
  <label class="text-caption font-medium text-fiore-text">Campo *</label>
  <input
    type="text"
    class="px-3 py-2 text-body-sm border border-fiore-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fiore-primary"
    placeholder="Ingresá el valor"
  />
  <span class="text-caption text-red-500">Mensaje de error</span>
</div>
```

### Action icons (table row)

```html
<div class="flex items-center justify-center gap-2">
  <a [routerLink]="['edit', item.id]" class="p-2 rounded-lg bg-pink-100 text-fiore-primary hover:bg-fiore-bg-dark transition-colors" title="Editar">
    <fa-icon [icon]="faPencil" class="text-sm"></fa-icon>
  </a>
  <button (click)="onDelete(item.id)" class="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors" title="Eliminar">
    <fa-icon [icon]="faTrash" class="text-sm"></fa-icon>
  </button>
</div>
```

### Page header (list pages)

```html
<div class="p-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-h2 font-bold text-fiore-text">Título del Módulo</h1>
    <a routerLink="create" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-fiore-primary text-white text-button hover:bg-fiore-primary-dark transition-all">
      <fa-icon [icon]="faPlus"></fa-icon>
      Nuevo
    </a>
  </div>
</div>
```

---

## References

- Full color palette: [docs/design/colors.md](../../docs/design/colors.md)
- Typography scale: [docs/design/typography.md](../../docs/design/typography.md)
- Component examples: [docs/design/components.md](../../docs/design/components.md)
