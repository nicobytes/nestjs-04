import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {

  private categories: Category[] = [
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
    return this.categories;
  }

  findOne(id: string) {
    const product = this.categories.find(item => item.id === +id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.categories.push(data);
    return data;
  }

  update(id: string, changes: any) {
    const product = this.findOne(id);
    return product;
  }

  remove(id: string) {
    const productIndex = this.categories.findIndex(item => item.id === +id);
    if (productIndex >= 0) {
      this.categories.splice(productIndex, 1);
    }
  }
}
