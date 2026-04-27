---
name: angular-patterns
description: >
  Angular 21 patterns and conventions for the Fiore project.
  Trigger: When creating any component, service, model, route, or module in this project.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating a new component (page or presentational)
- Creating a new service
- Defining a model or DTO
- Creating or editing a route file
- Wiring up a new module to the dashboard

---

## Critical Patterns

### ABSOLUTE RULES — never break these

- NO `console.log` anywhere. Not even `console.error`.
- NO comments in code.
- NO `*ngFor` / `*ngIf` — use `@for` / `@if` exclusively.
- NO `any` type.
- NO `FontAwesomeModule` — import `FaIconComponent` directly.
- ALWAYS use signals for state.
- ALWAYS use `inject()` — never constructor injection.
- ALWAYS lazy load every route (`loadComponent` / `loadChildren`).

---

## File Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Page component | `{feature}.ts` | `category.ts` |
| Page template | `{feature}.html` | `category.html` |
| Page styles | `{feature}.css` | `category.css` |
| Service | `{feature}.service.ts` | `category.service.ts` |
| Model | `{feature}.model.ts` | `category.model.ts` |
| Route file | `{feature}.route.ts` | `category.route.ts` |
| Container component | `{feature}-container.ts` | `category-container.ts` |
| Form component | `{feature}-form.ts` | `category-form.ts` |

---

## Module Folder Structure

Every dashboard feature module follows this structure:

```
features/dashboard/{module}/
├── {module}.route.ts       ← lazy route definitions
├── api/
│   └── {module}.service.ts ← HTTP service
├── models/
│   └── {module}.model.ts   ← interfaces + DTOs
├── pages/
│   ├── {module}.ts         ← main list page
│   ├── {module}.html
│   └── {module}.css
├── component/              ← reusable components for this module
│   └── {module}-container/ ← create/edit form container
│       ├── {module}-container.ts
│       └── {module}-form/
│           └── {module}-form.ts
└── state/                  ← signals-based state (if needed)
    └── .gitkeep
```

---

## Component Pattern

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FeatureModel } from '../models/feature.model';
import { FeatureService } from '../api/feature.service';

@Component({
  selector: 'app-feature',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
})
export class Feature implements OnInit {
  private featureService = inject(FeatureService);

  protected readonly items = signal<FeatureModel[]>([]);
  protected readonly filteredItems = signal<FeatureModel[]>([]);

  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.featureService.getAll().subscribe({
      next: (items) => {
        this.items.set(items);
        this.filteredItems.set(items);
      },
      error: () => alert('Error al cargar los datos'),
    });
  }
}
```

---

## Service Pattern

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FeatureModel, CreateFeatureDTO, UpdateFeatureDTO } from '../models/feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/feature`;

  getAll() {
    return this.http.get<FeatureModel[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<FeatureModel>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateFeatureDTO) {
    return this.http.post<FeatureModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateFeatureDTO) {
    return this.http.put<FeatureModel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

---

## Model Pattern

```typescript
export interface FeatureModel {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateFeatureDTO = Omit<FeatureModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;
export type UpdateFeatureDTO = Partial<CreateFeatureDTO>;
```

---

## Route Pattern (module-level)

```typescript
import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/feature').then(m => m.Feature),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./component/feature-container/feature-container').then(m => m.FeatureContainer),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/feature-container/feature-container').then(m => m.FeatureContainer),
  },
];
```

> NOTE: File imports do NOT include the `.ts` extension.

---

## Registering a Module in Dashboard

Add the new module to `src/app/features/dashboard/dashboard.route.ts`:

```typescript
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.route').then(m => m.FEATURE_ROUTES)
},
```

Constant naming: `{MODULE_NAME_UPPERCASE}_ROUTES`

---

## Template Patterns

### List page structure

```html
<div class="p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-fiore-text">Título</h1>
    <a routerLink="create" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-fiore-primary text-white hover:bg-fiore-primary-dark transition-all">
      <fa-icon [icon]="faPlus"></fa-icon>
      Crear Nuevo
    </a>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto rounded-lg shadow">
    <table class="w-full bg-white">
      <thead class="bg-fiore-bg-alt">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-fiore-text">Columna</th>
        </tr>
      </thead>
      <tbody>
        @for (item of filteredItems(); track item.id) {
          <tr class="border-b border-fiore-border hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3">{{ item.name }}</td>
          </tr>
        }
        @if (filteredItems().length === 0) {
          <tr>
            <td colspan="5" class="px-4 py-8 text-center text-fiore-text-muted">
              No hay elementos para mostrar.
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>
</div>
```

### FontAwesome usage in template

```html
<fa-icon [icon]="faPlus" class="text-sm"></fa-icon>
```

---

## Signal Patterns

```typescript
// Read-only public signal
protected readonly items = signal<Model[]>([]);

// Computed derived signal
protected readonly count = computed(() => this.items().length);

// Writable internal signal
private readonly loading = signal(false);

// Update pattern
this.items.set(newValue);
this.items.update(current => [...current, newItem]);
```

---

## Environment

```typescript
import { environment } from '../../../../../environments/environment';
// apiUrl = environment.apiUrl
```

Relative path depth depends on where the service lives. From `features/dashboard/{module}/api/`:
- `../../../../../environments/environment`
