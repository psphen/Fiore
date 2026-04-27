# Fiore — Tipografía

## Familia Principal

**Open Sans** — Usar para TODO el texto (headers y body).

## Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

O en CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
```

## Escala Tipográfica

| Nombre | Peso | Tamaño | Line Height | Uso |
|--------|------|--------|-------------|-----|
| **Display** | 800 | 3rem (48px) | 1.2 | Títulos principales (hero) |
| **H1** | 700 | 2.25rem (36px) | 1.3 | Títulos de página |
| **H2** | 700 | 1.875rem (30px) | 1.3 | Títulos de sección |
| **H3** | 600 | 1.5rem (24px) | 1.4 | Subtítulos |
| **H4** | 600 | 1.25rem (20px) | 1.4 | Títulos de card |
| **Body Large** | 400 | 1.125rem (18px) | 1.6 | Descripciones largas |
| **Body** | 400 | 1rem (16px) | 1.6 | Texto general |
| **Body Small** | 400 | 0.875rem (14px) | 1.5 | Texto auxiliar |
| **Caption** | 500 | 0.75rem (12px) | 1.4 | Labels, captions |
| **Button** | 600 | 0.875rem (14px) | 1 | Texto de botones |

## Configuración Tailwind

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Open Sans', 'system-ui', 'sans-serif'],
},
fontSize: {
  'display': ['3rem', { lineHeight: '1.2', fontWeight: '800' }],
  'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
  'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
  'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
  'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],
  'body': ['1rem', { lineHeight: '1.6' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5' }],
  'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
}
```

## Uso en HTML

```html
<!-- Títulos -->
<h1 class="text-h1 text-fiore-text">Bienvenido a Fiore</h1>
<h2 class="text-h2 text-fiore-text">Nuestras Flores</h2>
<h3 class="text-h3 text-fiore-text-secondary">Rosas</h3>

<!-- Cuerpo -->
<p class="text-body text-fiore-text">
  Descripción del producto o contenido...
</p>
<p class="text-body-sm text-fiore-text-secondary">
  Texto auxiliar o metadata...
</p>

<!-- Caption/Label -->
<span class="text-caption text-fiore-text-muted">Categoría</span>

<!-- Botones -->
<button class="text-button font-semibold">Texto del botón</button>
```

## Peso de Fuentes

| Peso | Nombre | Uso |
|------|--------|-----|
| 300 | Light | Texto decorativo |
| 400 | Regular | Body text (default) |
| 500 | Medium | Labels, captions |
| 600 | Semibold | Subtítulos, emphasis |
| 700 | Bold | Títulos, headings |
| 800 | Extrabold | Display, hero text |

## Ejemplo Completo de Page Title

```html
<div class="flex flex-col gap-2">
  <h1 class="text-h1 text-fiore-text font-bold">
    Dashboard
  </h1>
  <p class="text-body-sm text-fiore-text-secondary">
    Resumen de tu florería
  </p>
</div>
```