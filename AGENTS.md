# Fiore — Angular 21 E-commerce para Floristería

## Descripción del Proyecto

**Fiore** es un e-commerce especializado en la venta de flores. La aplicación se divide en dos zonas principales:

- **Landing Page (Pública)**: Usuarios pueden ver productos, agregar al carrito, registrarse, iniciar sesión
- **Dashboard (Administrativo)**: Administradores gestionan productos, categorías, inventario, órdenes, estadísticas y más

## Tech Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 21 | Framework principal con signals y nuevo control flow |
| Angular SSR | 21 | Server-side rendering |
| Bun | - | Package manager |
| Vitest | - | Unit testing |
| Tailwind CSS | 4 | Styling |
| FontAwesome | latest | Biblioteca de iconos (OBLIGATORIO para TODOS los iconos) |
| Firebase | - | Backend/Auth via @angular/fire |
| Google Fonts | Open Sans | Tipografía |

## External API

- **Proxy**: `/api/*` → `https://api.escuelajs.co`

## Commands

```bash
npm start        # Dev server (http://localhost:4200)
npm run start:proxy  # Dev server con proxy API
npm run build    # Production build
npm run test     # Vitest unit tests
npm run watch    # Watch mode para desarrollo
```

## Arquitectura General

### Clean Architecture Structure

```
src/app/
├── core/                    # Infraestructura compartida
│   ├── guards/            # Auth guards (auth.guard, admin.guard, role.guard, exit.guard)
│   ├── interceptors/      # HTTP interceptors (token, time)
│   └── services/         # Core services (auth, token, files)
├── layouts/               # Shell layouts
│   ├── app-shell/         # Dashboard shell (navbar + sidebar)
│   ├── app-auth-shell/    # Auth pages shell (login, register)
│   └── public-shell/      # Public shell (navbar-ecommerce)
├── features/
│   ├── public/           # Landing page (clientes)
│   │   ├── home/        # Landing page principal
│   │   ├── login/       # Login de usuarios
│   │   ├── register/    # Registro de usuarios
│   │   ├── my-cart/     # Carrito de compras
│   │   └── product-detail/  # Detalle de producto
│   └── dashboard/        # Admin interno
│       ├── home/         # Dashboard stats (charts, calendar, trending)
│       ├── product/      # CRUD productos
│       ├── category/     # CRUD categorías
│       ├── orders/       # Gestión de órdenes
│       ├── inventory/    # Control de inventario
│       ├── users/        # Gestión de usuarios
│       ├── statistics/   # Estadísticas
│       ├── calendar/     # Calendario
│       ├── suppliers/    # Gestión de proveedores
│       └── profile/      # Perfil del admin
├── shared/ui/             # Componentes reutilizables
│   ├── button-secondary/
│   ├── product-card/
│   ├── products-modal/
│   ├── stepper/
│   └── not-found/
└── app.routes.ts          # Rutas principales
```

### Routes Structure

#### Public Routes (Landing Page)

| Path | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Landing page principal |
| `/login` | Login | Login de usuarios |
| `/register` | Register | Registro de usuarios |
| `/my-cart` | MyCart | Carrito de compras |
| `/product/:id` | ProductDetail | Detalle de producto |

#### Dashboard Routes (Admin)

Route base: `/dashboard`

| Path | Módulo | Descripción |
|------|--------|-------------|
| `/dashboard/home` | Home | Resumen general, calendario, categorías trending |
| `/dashboard/orders` | Orders | Órdenes del día/semana/mes |
| `/dashboard/product` | Product | CRUD de productos |
| `/dashboard/category` | Category | CRUD de categorías |
| `/dashboard/inventory` | Inventory | Control de inventario con filtros y stats |
| `/dashboard/users` | Users | Gestión de clientes |
| `/dashboard/statistics` | Statistics | Estadísticas |
| `/dashboard/calendar` | Calendar | Calendario |
| `/dashboard/suppliers` | Suppliers | Gestión de proveedores |
| `/dashboard/profile` | Profile | Perfil del admin |

## Design System

Consultar `docs/design/` para:
- **Colores**: Paleta completa con hex codes
- **Tipografía**: Open Sans (headers + body)
- **Spacing**: Sistema de espaciado
- **Componentes**: Guía de estilos

## Code Rules (OBLIGATORIO)

- **NUNCA** agregar comentarios en código
- **NUNCA** usar `console.log`
- **SIEMPRE** usar signals para state management
- **SIEMPRE** usar nuevo control flow (`@for`, `@if`) — NO `*ngFor`, `*ngIf`
- **SIEMPRE** usar FontAwesome para iconos (importar de `@fortawesome/free-solid-svg-icons`)
- **SIEMPRE** usar lazy loading para todas las rutas
- **SIEMPRE** seguir patrón de servicios con `inject(HttpClient)`
- Tipos TypeScript estrictos, sin `any`

## Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class ExampleService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/resource`;

  get() {
    return this.http.get<Type[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateDTO) {
    return this.http.post<Type>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateDTO) {
    return this.http.put<Type>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

## Component Pattern

```typescript
@Component({
  selector: 'app-feature',
  imports: [RouterLink, SharedComponent],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
})
export class Feature implements OnInit {
  private service = inject(Service);
  readonly data = signal<Data[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.service.get().subscribe({
      next: (data) => this.data.set(data),
      error: (err) => alert(err)
    });
  }
}
```

## Model Pattern

```typescript
export interface Model {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export type CreateModelDTO = Omit<Model, 'id' | 'slug'> & {
  categoryId: number;
}
```

## Route Pattern

```typescript
export const FEATURE_ROUTES: Routes = [
  { path: '', component: Feature },
  { path: 'create', component: FeatureForm },
  { path: 'edit/:id', component: FeatureForm }
];
```

## FontAwesome Usage

```typescript
import { FaIconPack } from '@fortawesome/angular-fontawesome';
import { faIconResolver } from '@fortawesome/angular-fontawesome';
import { faHome, faCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  providers: [
    { provide: FaIconPack, useValue: faIconResolver }
  ]
})
export class MyComponent {
  faHome = faHome;
  faCart = faCart;
}
```

```html
<fa-icon [icon]="faHome" class="text-lg"></fa-icon>
```

## Skills Disponibles

### Cuándo cargar cada skill

| Skill | Ubicación | Trigger |
|-------|-----------|---------|
| `angular-patterns` | [skills/angular-patterns/SKILL.md](skills/angular-patterns/SKILL.md) | Crear cualquier componente, servicio, modelo o ruta |
| `fiore-design-system` | [skills/fiore-design-system/SKILL.md](skills/fiore-design-system/SKILL.md) | Escribir HTML, aplicar estilos, usar colores o iconos |
| `module-scaffold` | [skills/module-scaffold/SKILL.md](skills/module-scaffold/SKILL.md) | Crear un módulo nuevo completo en el dashboard |
| `products` | [skills/products/SKILL.md](skills/products/SKILL.md) | Trabajar en `features/dashboard/product/` |
| `orders` | [skills/orders/SKILL.md](skills/orders/SKILL.md) | Trabajar en `features/dashboard/orders/` |
| `inventory` | [skills/inventory/SKILL.md](skills/inventory/SKILL.md) | Trabajar en `features/dashboard/inventory/` |
| `categories` | [skills/categories/SKILL.md](skills/categories/SKILL.md) | Trabajar en `features/dashboard/category/` |

### Stack de skills por tarea

| Tarea | Skills a cargar (en orden) |
|-------|---------------------------|
| Crear módulo nuevo completo | `angular-patterns` → `fiore-design-system` → `module-scaffold` |
| Escribir template HTML | `fiore-design-system` |
| Extender módulo existente | `angular-patterns` + skill del dominio correspondiente |
| Crear servicio | `angular-patterns` |
| Corregir estilos | `fiore-design-system` |

## Feature Specifications

Consultar `docs/features/` para especificaciones detalladas de cada módulo.

## Environment

- **TypeScript**: Strict mode
- **Prettier**: Single quotes, 100 print width
