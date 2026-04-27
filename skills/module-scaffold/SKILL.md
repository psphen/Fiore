---
name: module-scaffold
description: >
  Step-by-step protocol to scaffold a complete dashboard module in Fiore.
  Trigger: When creating a new dashboard module, adding a new feature, or asked to scaffold/generate a full module.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating a new module under `features/dashboard/`
- Setting up the full folder structure for a feature
- Adding CRUD to a new entity

---

## Critical Rules

- Always read `skills/angular-patterns/SKILL.md` FIRST for code conventions
- Always read `skills/fiore-design-system/SKILL.md` FIRST for UI patterns
- If a domain SKILL exists for the module (e.g. `skills/products/SKILL.md`), read it FIRST
- NEVER skip a step in the checklist below

---

## Scaffolding Checklist

Work through these steps IN ORDER. Do not skip.

### Step 1 — Folder structure

Create the following structure (replace `{module}` with the feature name in lowercase):

```
src/app/features/dashboard/{module}/
├── {module}.route.ts
├── api/
│   └── {module}.service.ts
├── models/
│   └── {module}.model.ts
├── pages/
│   ├── {module}.ts
│   ├── {module}.html
│   └── {module}.css
├── component/
│   └── {module}-container/
│       ├── {module}-container.ts
│       ├── {module}-container.html
│       └── {module}-form/
│           ├── {module}-form.ts
│           └── {module}-form.html
└── state/
    └── .gitkeep
```

### Step 2 — Model (`models/{module}.model.ts`)

Define the main interface and DTOs based on the feature spec in `docs/features/{module}.md`.

```typescript
export interface ModuleName {
  id: number;
  // ... fields from spec
  createdAt: Date;
  updatedAt: Date;
}

export type CreateModuleNameDTO = Omit<ModuleName, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateModuleNameDTO = Partial<CreateModuleNameDTO>;
```

### Step 3 — Service (`api/{module}.service.ts`)

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ModuleName, CreateModuleNameDTO, UpdateModuleNameDTO } from '../models/{module}.model';

@Injectable({ providedIn: 'root' })
export class ModuleNameService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/{endpoint}`;

  getAll() {
    return this.http.get<ModuleName[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<ModuleName>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateModuleNameDTO) {
    return this.http.post<ModuleName>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateModuleNameDTO) {
    return this.http.put<ModuleName>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

### Step 4 — Route file (`{module}.route.ts`)

```typescript
import { Routes } from '@angular/router';

export const MODULE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/{module}').then(m => m.ModuleName),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./component/{module}-container/{module}-container').then(m => m.ModuleNameContainer),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/{module}-container/{module}-container').then(m => m.ModuleNameContainer),
  },
];
```

### Step 5 — Page component (`pages/{module}.ts`)

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModuleName } from '../models/{module}.model';
import { ModuleNameService } from '../api/{module}.service';

@Component({
  selector: 'app-{module}',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './{module}.html',
  styleUrl: './{module}.css',
})
export class ModuleName implements OnInit {
  private moduleService = inject(ModuleNameService);

  protected readonly items = signal<ModuleName[]>([]);
  protected readonly filteredItems = signal<ModuleName[]>([]);
  protected readonly searchTerm = signal('');

  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faSearch = faSearch;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.moduleService.getAll().subscribe({
      next: (items) => {
        this.items.set(items);
        this.filteredItems.set(items);
      },
      error: () => alert('Error al cargar los datos'),
    });
  }

  protected onSearch(term: string): void {
    this.searchTerm.set(term);
    const lower = term.toLowerCase();
    this.filteredItems.set(
      this.items().filter(item => item.name.toLowerCase().includes(lower))
    );
  }

  protected onDelete(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    this.moduleService.delete(id).subscribe({
      next: () => this.loadItems(),
      error: () => alert('Error al eliminar'),
    });
  }
}
```

### Step 6 — Page template (`pages/{module}.html`)

Use `skills/fiore-design-system/SKILL.md` patterns for:
- Page header with title + "Nuevo" button
- Search input
- Table with `@for` loop and empty state

### Step 7 — Container (`component/{module}-container/{module}-container.ts`)

The container detects if it's `create` or `edit` by checking `ActivatedRoute`:

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleNameService } from '../../api/{module}.service';
import { ModuleNameForm } from './{module}-form/{module}-form';

@Component({
  selector: 'app-{module}-container',
  imports: [ModuleNameForm],
  template: `
    <app-{module}-form
      [initialData]="item()"
      (formSubmit)="onSubmit($event)"
    />
  `,
})
export class ModuleNameContainer implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ModuleNameService);

  protected readonly item = signal<ModuleName | null>(null);
  private id = signal<number | null>(null);

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(Number(paramId));
      this.service.getById(Number(paramId)).subscribe({
        next: (data) => this.item.set(data),
        error: () => alert('Error al cargar'),
      });
    }
  }

  protected onSubmit(dto: CreateModuleNameDTO | UpdateModuleNameDTO): void {
    const id = this.id();
    const request = id
      ? this.service.update(id, dto as UpdateModuleNameDTO)
      : this.service.create(dto as CreateModuleNameDTO);

    request.subscribe({
      next: () => this.router.navigate(['/dashboard/{module}']),
      error: () => alert('Error al guardar'),
    });
  }
}
```

### Step 8 — Register in dashboard

Add to `src/app/features/dashboard/dashboard.route.ts`:

```typescript
{
  path: '{module}',
  loadChildren: () => import('./{module}/{module}.route').then(m => m.MODULE_ROUTES)
},
```

### Step 9 — Add to sidebar

Add a nav item in `src/app/layouts/app-shell/sidebar/` so the module appears in the admin navigation.

---

## Verification Checklist

Before considering the module complete, verify:

- [ ] `{module}.model.ts` — interface + DTOs defined
- [ ] `{module}.service.ts` — all CRUD methods present
- [ ] `{module}.route.ts` — lazy routes for `''`, `create`, `edit/:id`
- [ ] Page component uses signals for all state
- [ ] Template uses `@for` / `@if` — no `*ngFor` / `*ngIf`
- [ ] Template uses design token classes — no raw hex values
- [ ] All icons come from `@fortawesome/free-solid-svg-icons`
- [ ] No `console.log` / `console.error`
- [ ] No comments in code
- [ ] Module registered in `dashboard.route.ts`

---

## References

- Code conventions: [skills/angular-patterns/SKILL.md](../angular-patterns/SKILL.md)
- UI patterns: [skills/fiore-design-system/SKILL.md](../fiore-design-system/SKILL.md)
- Feature specs: [docs/features/](../../docs/features/)
