import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandsRepo.find();
  }

  findOne(id: string) {
    const item = this.brandsRepo.findOne();
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  create(data: any) {
    const newItem = this.brandsRepo.create(data);
    return this.brandsRepo.save(newItem);
  }

  async update(id: string, changes: any) {
    const item = await this.brandsRepo.findOne(id);
    this.brandsRepo.merge(item, changes);
    return this.brandsRepo.save(item);
  }

  async remove(id: string) {
    await this.brandsRepo.delete(id);
    return true;
  }
}
