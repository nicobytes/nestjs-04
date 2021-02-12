import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: string) {
    const product = this.categoryRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    const newItem = this.categoryRepo.create(data);
    return this.categoryRepo.save(newItem);
  }

  async update(id: string, changes: any) {
    const item = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(item, changes);
    return this.categoryRepo.save(item);
  }

  async remove(id: string) {
    await this.categoryRepo.delete(id);
    return true;
  }
}
