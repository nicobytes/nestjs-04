import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepo.find();
  }

  findOne(id: string) {
    const product = this.productsRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    const newItem = this.productsRepo.create(data);
    return this.productsRepo.save(newItem);
  }

  async update(id: string, changes: any) {
    const item = await this.productsRepo.findOne(id);
    this.productsRepo.merge(item, changes);
    return this.productsRepo.save(item);
  }

  async remove(id: string) {
    await this.productsRepo.delete(id);
    return true;
  }
}
