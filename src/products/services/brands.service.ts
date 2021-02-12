import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: 1,
      name: 'Category 1',
      image: 'url'
    },
    {
      id: 2,
      name: 'Category 2',
      image: 'url'
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const product = this.brands.find(item => item.id === +id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.brands.push(data);
    return data;
  }

  update(id: string, changes: any) {
    const product = this.findOne(id);
    return product;
  }

  remove(id: string) {
    const productIndex = this.brands.findIndex(item => item.id === +id);
    if (productIndex >= 0) {
      this.brands.splice(productIndex, 1);
    }
  }
}
