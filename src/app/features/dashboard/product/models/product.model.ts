import { Category } from "../../category/models/category.model";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  taxes?: number
}

export type CreateProductDTO = Omit<Product, 'id' | 'slug' | 'category'> & {
  categoryId: number;
}

export type UpdateProductDTO = Pick<Product, 'title' | 'price'>;
