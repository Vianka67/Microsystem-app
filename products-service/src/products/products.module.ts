import { Module } from '@nestjs/common';
import { ProductsController } from './presentation/controllers/products.controller';
import { InMemoryProductRepository } from './infrastructure/persistence/in-memory-product.repository';
import { CreateProductUseCase, GetAllProductsUseCase, GetProductUseCase, RemoveProductUseCase, UpdateProductUseCase } from './application/use-cases/product.use-cases';

@Module({
  controllers: [ProductsController],
  providers: [
    // Use Cases
    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,

    // Repository Injection
    {
      provide: 'ProductRepository',
      useClass: InMemoryProductRepository,
    },
  ],
})
export class ProductsModule { }
