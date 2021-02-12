import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  private users: User[] = [
    {
      id: 1,
      email: 'user1@mail.com',
      password: '124'
    },
    {
      id: 1,
      email: 'user1@mail.com',
      password: '124'
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const product = this.users.find(item => item.id === +id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.users.push(data);
    return data;
  }

  update(id: string, changes: any) {
    const product = this.findOne(id);
    return product;
  }

  remove(id: string) {
    const productIndex = this.users.findIndex(item => item.id === +id);
    if (productIndex >= 0) {
      this.users.splice(productIndex, 1);
    }
  }
}
