import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class GetAllProductsUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) { }

    execute(): Product[] {
        return this.productRepository.findAll();
    }
}

@Injectable()
export class GetProductUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) { }

    execute(id: number): Product | null {
        return this.productRepository.findOne(id);
    }
}

@Injectable()
export class CreateProductUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) { }

    execute(product: Product): Product {
        return this.productRepository.create(product);
    }
}

@Injectable()
export class UpdateProductUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) { }

    execute(id: number, updateData: Partial<Product>): Product | null {
        return this.productRepository.update(id, updateData);
    }
}

@Injectable()
export class RemoveProductUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) { }

    execute(id: number): boolean {
        return this.productRepository.remove(id);
    }
}
