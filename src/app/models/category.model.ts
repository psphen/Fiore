export interface Category{
  id: number;
  name: string;
  slug: string;
  image: string;
}

export type CategoryDTO = Omit<Category, 'id' | 'slug'>;
