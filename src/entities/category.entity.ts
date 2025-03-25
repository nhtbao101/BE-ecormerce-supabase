import {
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { generateSlug } from '../shared/helper';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  product: Product;

  @BeforeInsert()
  createSlug() {
    this.slug = generateSlug(
      this.name + '-' + parseFloat(`${Math.random() * 1000}`).toFixed(2),
    );
  }

  @AfterUpdate()
  updateSlug() {
    this.slug = generateSlug(
      this.name + '-' + parseFloat(`${Math.random() * 1000}`).toFixed(2),
    );
  }
}
