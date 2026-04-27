# Skill Registry - Fiore

## Project Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
|       |             |         |

## Global Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| `sdd-init` | Initialize SDD context | `sdd init`, `iniciar sdd` |
| `sdd-propose` | Create change proposals | `/sdd-propose` |
| `sdd-spec` | Write specifications | `/sdd-spec` |
| `sdd-design` | Create technical design | `/sdd-design` |
| `sdd-tasks` | Break down tasks | `/sdd-tasks` |
| `sdd-apply` | Implement tasks | `/sdd-apply` |
| `sdd-verify` | Validate implementation | `/sdd-verify` |
| `sdd-archive` | Archive completed change | `/sdd-archive` |
| `skill-creator` | Create AI agent skills | Create new skill |
| `go-testing` | Go testing patterns | Go tests |

## Code Patterns

### Component Pattern
```typescript
@Component({
  selector: 'app-my-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './my-component.html',
  styleUrl: './my-component.css',
})
export class MyComponent implements OnInit {
  private myService = inject(MyService);
  readonly data = signal<Data[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.myService.get().subscribe({
      next: (data) => this.data.set(data),
      error: (error) => alert(error)
    });
  }
}
```

### Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/resource`;

  get() {
    return this.http.get<MyModel[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<MyModel>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateDTO) {
    return this.http.post<MyModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateDTO) {
    return this.http.put<MyModel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

### Model Pattern
```typescript
export interface MyModel {
  id: number;
  title: string;
  description: string;
  category: Category;
}

export type CreateMyModelDTO = Omit<MyModel, 'id'>;
export type UpdateMyModelDTO = Pick<MyModel, 'title'>;
```
