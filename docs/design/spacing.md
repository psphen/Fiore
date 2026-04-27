# Fiore — Sistema de Spacing

## Espaciado Base

| Token | Valor | Uso |
|-------|-------|-----|
| `xs` | 0.25rem (4px) | Espaciado muy pequeño (iconos) |
| `sm` | 0.5rem (8px) | Entre elementos pequeños |
| `md` | 1rem (16px) | Espaciado por defecto |
| `lg` | 1.5rem (24px) | Entre secciones |
| `xl` | 2rem (32px) | Separación grande |
| `2xl` | 3rem (48px) | Entre páginas/sections |
| `3xl` | 4rem (64px) | Espaciado hero |

## Configuración Tailwind

```javascript
// tailwind.config.js
spacing: {
  'xs': '0.25rem',    // 4px
  'sm': '0.5rem',     // 8px
  'md': '1rem',       // 16px
  'lg': '1.5rem',     // 24px
  'xl': '2rem',       // 32px
  '2xl': '3rem',      // 48px
  '3xl': '4rem',      // 64px
}
```

## Padding y Margin

### Padding (Internal spacing)

```html
<!-- Padding pequeño -->
<div class="p-sm"> contenido </div>

<!-- Padding mediano (cards) -->
<div class="p-md"> contenido </div>

<!-- Padding grande (containers) -->
<div class="p-lg"> contenido </div>
```

### Margin (External spacing)

```html
<!-- Margen entre elementos -->
<div class="mb-sm"> Elemento 1 </div>
<div> Elemento 2 </div>

<!-- Margen entre secciones -->
<section class="mt-xl"> ... </section>
<section class="mt-xl"> ... </section>
```

## Gaps (Flex/Grid)

```html
<!-- Gap pequeño -->
<div class="flex gap-xs">
  <span>Item 1</span>
  <span>Item 2</span>
</div>

<!-- Gap mediano -->
<div class="flex gap-sm">
  <button>Botón</button>
  <button>Botón</button>
</div>

<!-- Grid con gap -->
<div class="grid grid-cols-3 gap-md">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-none` | 0 | Sin border radius |
| `rounded-sm` | 0.125rem (2px) | Botones pequeños |
| `rounded` | 0.25rem (4px) | Inputs |
| `rounded-md` | 0.375rem (6px) | Cards pequeñas |
| `rounded-lg` | 0.5rem (8px) | Cards, modales |
| `rounded-xl` | 0.75rem (12px) | Contenedores |
| `rounded-2xl` | 1rem (16px) | Paneles grandes |
| `rounded-full` | 9999px | Avatars, pills |

## Ejemplos de Uso

### Card Component

```html
<div class="bg-white p-md rounded-lg shadow-sm">
  <h3 class="text-h4 mb-sm">Título</h3>
  <p class="text-body text-fiore-text-secondary">
    Descripción del card
  </p>
</div>
```

### Form Layout

```html
<div class="flex flex-col gap-md">
  <div>
    <label class="text-caption mb-xs block">Nombre</label>
    <input class="w-full p-sm rounded border" />
  </div>
  <div>
    <label class="text-caption mb-xs block">Email</label>
    <input class="w-full p-sm rounded border" />
  </div>
  <button class="p-md rounded-lg">Enviar</button>
</div>
```

### Grid Layout

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
  @for (product of products; track product.id) {
    <div class="p-md rounded-xl bg-fiore-bg-alt">
      <!-- Product card -->
    </div>
  }
</div>
```

## Ancho de Contenedores

| Nombre | Max Width | Uso |
|--------|-----------|-----|
| `container-sm` | 640px | Formularios estrechos |
| `container-md` | 768px | Contenido standard |
| `container-lg` | 1024px | Dashboard |
| `container-xl` | 1280px | Contenedor principal |
| `container-2xl` | 1536px | Máximo |

```html
<div class="container-xl mx-auto px-md">
  <!-- Contenido centrado -->
</div>
```

## Responsive Spacing

```html
<!-- Mobile: p-sm, Desktop: p-lg -->
<div class="p-sm md:p-lg">

<!-- Mobile: gap-xs, Desktop: gap-md -->
<div class="flex flex-col sm:flex-row gap-xs sm:gap-md">

<!-- Mobile: text-body, Tablet: text-body-lg -->
<p class="text-body sm:text-body-lg">
```

## Resumen Rápido

| Contexto | Padding | Gap | Border Radius |
|----------|---------|-----|--------------|
| Botones | `p-sm` a `p-md` | - | `rounded-lg` |
| Cards | `p-md` | `gap-md` | `rounded-lg` |
| Inputs | `p-sm` | - | `rounded` |
| Modal | `p-lg` | `gap-lg` | `rounded-xl` |
| Page | `p-md` | `gap-xl` | - |