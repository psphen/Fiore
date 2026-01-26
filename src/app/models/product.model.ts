import { CategoryModel } from "./category.model";

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
}

export interface ProductSaveUpda {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
