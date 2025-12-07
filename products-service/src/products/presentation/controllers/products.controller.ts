import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateProductUseCase, GetAllProductsUseCase, GetProductUseCase, RemoveProductUseCase, UpdateProductUseCase } from '../../application/use-cases/product.use-cases';
import { Product } from '../../domain/entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
        private readonly getProductUseCase: GetProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly removeProductUseCase: RemoveProductUseCase,
    ) { }

    @Post()
    create(@Body() createProductDto: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
        // Mapping DTO to Entity (simplified)
        const product = new Product();
        Object.assign(product, createProductDto);
        return this.createProductUseCase.execute(product);
    }

    @Get()
    findAll() {
        return this.getAllProductsUseCase.execute();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const product = this.getProductUseCase.execute(+id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: Partial<Product>) {
        const product = this.updateProductUseCase.execute(+id, updateProductDto);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const deleted = this.removeProductUseCase.execute(+id);
        if (!deleted) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return { deleted: true };
    }
}
