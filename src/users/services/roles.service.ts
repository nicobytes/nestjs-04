import { Injectable, NotFoundException } from '@nestjs/common';

import { Role } from './../entities/rol.entity';

@Injectable()
export class RolesService {

  private roles: Role[] = [
    {
      id: 1,
      name: 'Role 1',
    },
    {
      id: 2,
      name: 'Role 2',
    },
  ];

  findAll() {
    return this.roles;
  }

  findOne(id: string) {
    const product = this.roles.find(item => item.id === +id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.roles.push(data);
    return data;
  }

  update(id: string, changes: any) {
    const product = this.findOne(id);
    return product;
  }

  remove(id: string) {
    const productIndex = this.roles.findIndex(item => item.id === +id);
    if (productIndex >= 0) {
      this.roles.splice(productIndex, 1);
    }
  }
}
