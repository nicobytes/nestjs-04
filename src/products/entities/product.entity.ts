import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @ManyToOne(
    () => Brand,
    brand => brand.products,
  )
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
