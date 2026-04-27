# Fiore — Sistema de Colores

## Color de Fondo (Body)

```css
body {
  background-color: #fff6fa;
}
```

## Paleta Principal

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Background** | `#fff6fa` | Fondo principal (rosa pastel suave) |
| **Background Alt** | `#fce4ec` | Fondos alternativos, cards |
| **Background Dark** | `#f8bbd9` | Hover states, acentos |

## Colores Semánticos

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Primary** | `#e91e63` | Botones principales, links activos |
| **Primary Light** | `#f48fb1` | Hover en primary |
| **Primary Dark** | `#c2185b` | Active/pressed states |

## Neutros

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Text Primary** | `#1a1a2e` | Texto principal |
| **Text Secondary** | `#6b7280` | Texto secundario, labels |
| **Text Muted** | `#9ca3af` | Placeholders, hints |
| **Border** | `#f0e6ea` | Bordes suaves |
| **Border Dark** | `#d4c4cb` | Bordes más visibles |

## Estados

| Estado | Hex | Uso |
|--------|-----|-----|
| **Success** | `#10b981` | Estados de éxito |
| **Warning** | `#f59e0b` | Warnings |
| **Error** | `#ef4444` | Errores |
| **Info** | `#3b82f6` | Información |

## Uso en Tailwind

```css
/* tailwind.config.js */
colors: {
  'fiore': {
    'bg': '#fff6fa',
    'bg-alt': '#fce4ec',
    'bg-dark': '#f8bbd9',
    'primary': '#e91e63',
    'primary-light': '#f48fb1',
    'primary-dark': '#c2185b',
    'text': '#1a1a2e',
    'text-secondary': '#6b7280',
    'text-muted': '#9ca3af',
    'border': '#f0e6ea',
    'border-dark': '#d4c4cb',
  }
}
```

## Ejemplos de Uso

```html
<!-- Botón primario -->
<button class="bg-fiore-primary text-white px-4 py-2 rounded-lg">
  Agregar al carrito
</button>

<!-- Card con fondo alternativo -->
<div class="bg-fiore-bg-alt rounded-xl p-4">
  <h3 class="text-fiore-text font-semibold">Título</h3>
  <p class="text-fiore-text-secondary">Descripción</p>
</div>

<!-- Input con borde -->
<input 
  class="border border-fiore-border rounded-lg px-4 py-2 focus:border-fiore-primary"
  placeholder="Buscar flores..."
/>
```