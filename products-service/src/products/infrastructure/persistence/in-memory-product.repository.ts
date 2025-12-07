import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [
        {
            id: 1,
            name: 'MacBook Pro 16" M3 Max',
            price: 3499,
            stock: 15,
            category: 'Laptops',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Dell XPS 15',
            price: 1899,
            stock: 20,
            category: 'Laptops',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            name: 'NVIDIA GeForce RTX 4090',
            price: 1599,
            stock: 5,
            category: 'Componentes',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            name: 'AMD Ryzen 9 7950X',
            price: 699,
            stock: 12,
            category: 'Componentes',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 5,
            name: 'Monitor LG UltraGear 27" 144Hz',
            price: 299,
            stock: 30,
            category: 'Monitores',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 6,
            name: 'Teclado Mecánico Keychron K2',
            price: 89,
            stock: 50,
            category: 'Periféricos',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 7,
            name: 'Logitech MX Master 3S',
            price: 99,
            stock: 45,
            category: 'Periféricos',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 8,
            name: 'Samsung 990 PRO 2TB SSD',
            price: 169,
            stock: 60,
            category: 'Almacenamiento',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 9,
            name: 'Corsair Vengeance 32GB DDR5',
            price: 129,
            stock: 40,
            category: 'Componentes',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 10,
            name: 'Silla Gamer Secretlab Titan',
            price: 499,
            stock: 8,
            category: 'Accesorios',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    private currentId = 11;

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product | null {
        return this.products.find(product => product.id === id) || null;
    }

    create(product: Product): Product {
        const newProduct = {
            ...product,
            id: this.currentId++,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, updateData: Partial<Product>): Product | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        this.products[index] = {
            ...this.products[index],
            ...updateData,
            updatedAt: new Date(),
        };
        return this.products[index];
    }

    remove(id: number): boolean {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return false;
        this.products.splice(index, 1);
        return true;
    }
}
