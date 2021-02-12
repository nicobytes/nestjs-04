import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem lorem',
      price: 10000,
      stock: 0,
      image: 'url'
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'lorem lorem',
      price: 20000,
      stock: 0,
      image: 'url'
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'lorem lorem',
      price: 20000,
      stock: 0,
      image: 'url'
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find(item => item.id === +id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.products.push(data);
    return data;
  }

  update(id: string, changes: any) {
    const product = this.findOne(id);
    return product;
  }

  remove(id: string) {
    const productIndex = this.products.findIndex(item => item.id === +id);
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }
}
