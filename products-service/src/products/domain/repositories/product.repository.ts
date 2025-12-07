import { Product } from '../entities/product.entity';

export const ProductRepositoryToken = 'ProductRepository';

export interface ProductRepository {
  findAll(): Product[];
  findOne(id: number): Product | null;
  create(product: Product): Product;
  update(id: number, product: Partial<Product>): Product | null;
  remove(id: number): boolean;
}
