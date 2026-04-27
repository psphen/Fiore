# Fiore — Componentes UI

## Índice de Componentes

1. [Botones](#botones)
2. [Cards](#cards)
3. [Inputs](#inputs)
4. [Modals](#modals)
5. [Badges/Tags](#badgestags)
6. [Avatars](#avatars)
7. [Tablas](#tablas)
8. [Navegación](#navegación)

---

## Botones

### Variantes

| Variante | Uso | Clases |
|----------|-----|--------|
| **Primary** | Acciones principales | `bg-fiore-primary text-white hover:bg-fiore-primary-light` |
| **Secondary** | Acciones secundarias | `bg-transparent border border-fiore-primary text-fiore-primary hover:bg-fiore-bg-alt` |
| **Ghost** | Acciones menores | `bg-transparent text-fiore-text hover:bg-fiore-bg-alt` |
| **Danger** | Acciones destructivas | `bg-red-500 text-white hover:bg-red-600` |

### Tamaños

| Tamaño | Altura | Padding | Font |
|--------|--------|----------|------|
| **sm** | 32px | `px-3 py-1` | `text-caption` |
| **md** | 40px | `px-4 py-2` | `text-button` |
| **lg** | 48px | `px-6 py-3` | `text-body` |

### Estados

```html
<!-- Default -->
<button class="bg-fiore-primary text-white px-4 py-2 rounded-lg">
  Primary
</button>

<!-- Hover -->
<button class="bg-fiore-primary-light text-white px-4 py-2 rounded-lg">
  Hover
</button>

<!-- Disabled -->
<button class="bg-fiore-border text-fiore-text-muted px-4 py-2 rounded-lg cursor-not-allowed" disabled>
  Disabled
</button>

<!-- Loading -->
<button class="bg-fiore-primary text-white px-4 py-2 rounded-lg flex items-center gap-2" disabled>
  <fa-icon [icon]="faSpinner" [spin]="true"></fa-icon>
  Cargando...
</button>
```

---

## Cards

### Card Básica

```html
<div class="bg-white p-md rounded-lg shadow-sm border border-fiore-border">
  <h3 class="text-h4 text-fiore-text mb-sm">Título</h3>
  <p class="text-body text-fiore-text-secondary">
    Contenido de la card
  </p>
</div>
```

### Card de Producto

```html
<div class="bg-white rounded-xl overflow-hidden shadow-sm border border-fiore-border hover:shadow-md transition-shadow">
  <img [src]="product.images[0]" [alt]="product.title" class="w-full h-48 object-cover" />
  <div class="p-md">
    <span class="text-caption text-fiore-primary">Categoría</span>
    <h3 class="text-h4 text-fiore-text mt-xs">{{ product.title }}</h3>
    <p class="text-h3 text-fiore-primary font-bold mt-sm">${{ product.price }}</p>
    <button class="w-full mt-md bg-fiore-primary text-white py-2 rounded-lg flex items-center justify-center gap-2">
      <fa-icon [icon]="faCart"></fa-icon>
      Agregar
    </button>
  </div>
</div>
```

### Card de Stats

```html
<div class="bg-fiore-bg-alt p-lg rounded-xl">
  <div class="flex items-center justify-between mb-md">
    <span class="text-fiore-text-secondary">Ventas</span>
    <fa-icon [icon]="faTrendUp" class="text-fiore-primary"></fa-icon>
  </div>
  <p class="text-display text-fiore-text font-bold">$12,450</p>
  <p class="text-caption text-green-600 mt-xs">+15% vs ayer</p>
</div>
```

---

## Inputs

### Input de Texto

```html
<div class="flex flex-col gap-xs">
  <label class="text-caption text-fiore-text font-medium">Nombre</label>
  <input 
    type="text"
    placeholder="Ingresa tu nombre"
    class="w-full px-4 py-2 rounded-lg border border-fiore-border bg-white
           focus:outline-none focus:border-fiore-primary focus:ring-2 focus:ring-fiore-primary/20
           placeholder:text-fiore-text-muted"
  />
</div>
```

### Input con Icono

```html
<div class="relative">
  <fa-icon [icon]="faSearch" class="absolute left-3 top-1/2 -translate-y-1/2 text-fiore-text-muted"></fa-icon>
  <input 
    type="text"
    placeholder="Buscar..."
    class="w-full pl-10 pr-4 py-2 rounded-lg border border-fiore-border bg-white
           focus:outline-none focus:border-fiore-primary"
  />
</div>
```

### Textarea

```html
<textarea 
  class="w-full px-4 py-2 rounded-lg border border-fiore-border bg-white
         focus:outline-none focus:border-fiore-primary min-h-32 resize-none"
  placeholder="Descripción..."
></textarea>
```

### Select

```html
<select 
  class="w-full px-4 py-2 rounded-lg border border-fiore-border bg-white
         focus:outline-none focus:border-fiore-primary appearance-none cursor-pointer"
>
  <option value="">Seleccionar...</option>
  <option value="1">Opción 1</option>
  <option value="2">Opción 2</option>
</select>
```

### Checkbox

```html
<label class="flex items-center gap-sm cursor-pointer">
  <input type="checkbox" class="w-5 h-5 rounded border-fiore-border text-fiore-primary focus:ring-fiore-primary" />
  <span class="text-body text-fiore-text">Recordarme</span>
</label>
```

### Toggle Switch

```html
<button 
  role="switch" 
  [attr.aria-checked]="isActive"
  class="relative w-11 h-6 rounded-full transition-colors"
  [class.bg-fiore-primary]="isActive"
  [class.bg-fiore-border]="!isActive"
>
  <span class="sr-only">Toggle</span>
  <span 
    class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
    [class.translate-x-5]="isActive"
  ></span>
</button>
```

---

## Modals

### Modal Básico

```html
@if (isOpen) {
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" (click)="close()"></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-md p-lg">
      <div class="flex items-center justify-between mb-md">
        <h2 class="text-h3 text-fiore-text">Título</h2>
        <button (click)="close()" class="p-sm rounded-full hover:bg-fiore-bg-alt">
          <fa-icon [icon]="faXmark"></fa-icon>
        </button>
      </div>
      
      <div class="text-body text-fiore-text-secondary">
        Contenido del modal
      </div>
      
      <div class="flex justify-end gap-sm mt-xl">
        <button class="px-4 py-2 rounded-lg border border-fiore-border hover:bg-fiore-bg-alt">
          Cancelar
        </button>
        <button class="px-4 py-2 rounded-lg bg-fiore-primary text-white">
          Confirmar
        </button>
      </div>
    </div>
  </div>
}
```

---

## Badges/Tags

```html
<!-- Success -->
<span class="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-green-100 text-green-700">
  Activo
</span>

<!-- Warning -->
<span class="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-yellow-100 text-yellow-700">
  Pendiente
</span>

<!-- Error -->
<span class="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-red-100 text-red-700">
  Cancelado
</span>

<!-- Neutral -->
<span class="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-fiore-bg-alt text-fiore-text">
  Normal
</span>
```

---

## Avatars

```html
<!-- Tamaño sm -->
<img src="..." class="w-8 h-8 rounded-full object-cover" />

<!-- Tamaño md -->
<img src="..." class="w-10 h-10 rounded-full object-cover" />

<!-- Tamaño lg -->
<img src="..." class="w-12 h-12 rounded-full object-cover" />

<!-- Avatar con iniciales (sin imagen) -->
<div class="w-10 h-10 rounded-full bg-fiore-primary flex items-center justify-center">
  <span class="text-white text-body font-semibold">JD</span>
</div>
```

---

## Tablas

```html
<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-fiore-border">
        <th class="text-left text-caption text-fiore-text-secondary font-medium p-md">Producto</th>
        <th class="text-left text-caption text-fiore-text-secondary font-medium p-md">Precio</th>
        <th class="text-left text-caption text-fiore-text-secondary font-medium p-md">Estado</th>
        <th class="text-right text-caption text-fiore-text-secondary font-medium p-md">Acciones</th>
      </tr>
    </thead>
    <tbody>
      @for (item of items; track item.id) {
        <tr class="border-b border-fiore-border hover:bg-fiore-bg-alt">
          <td class="p-md text-body text-fiore-text">{{ item.name }}</td>
          <td class="p-md text-body text-fiore-text">${{ item.price }}</td>
          <td class="p-md">
            <span class="px-2 py-1 rounded-full text-caption bg-green-100 text-green-700">
              {{ item.status }}
            </span>
          </td>
          <td class="p-md text-right">
            <button class="p-sm hover:bg-fiore-border rounded">
              <fa-icon [icon]="faEdit"></fa-icon>
            </button>
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

---

## Navegación

### Sidebar Item

```html
<a 
  routerLink="/dashboard/product" 
  routerLinkActive="bg-fiore-bg-dark text-fiore-primary"
  class="flex items-center gap-sm px-md py-sm rounded-lg text-fiore-text hover:bg-fiore-bg-alt transition-colors"
>
  <fa-icon [icon]="faBox" class="w-5 h-5"></fa-icon>
  <span class="text-body">Productos</span>
</a>
```

### Breadcrumb

```html
<nav class="flex items-center gap-sm text-body-sm">
  <a href="#" class="text-fiore-text-secondary hover:text-fiore-primary">Home</a>
  <fa-icon [icon]="faChevronRight" class="text-fiore-text-muted text-caption"></fa-icon>
  <span class="text-fiore-text">Dashboard</span>
</nav>
```

### Tabs

```html
<div class="flex border-b border-fiore-border">
  <button 
    class="px-md py-sm text-body font-medium border-b-2 border-transparent hover:text-fiore-primary"
    [class.border-fiore-primary]="activeTab === 'tab1'"
    [class.text-fiore-primary]="activeTab === 'tab1'"
  >
    Tab 1
  </button>
  <button 
    class="px-md py-sm text-body font-medium border-b-2 border-transparent hover:text-fiore-primary"
    [class.border-fiore-primary]="activeTab === 'tab2'"
    [class.text-fiore-primary]="activeTab === 'tab2'"
  >
    Tab 2
  </button>
</div>
```