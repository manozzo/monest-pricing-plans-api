import { Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanModel } from './plan.model';

@Entity()
export class PriceModel {
  @PrimaryGeneratedColumn()
  priceID: number;

  @OneToMany(() => PlanModel, (plan) => plan.priceID)
  plans: PlanModel[];

  @Column()
  value: number;

  @Column()
  isAnnual: boolean;

  @Column()
  @Max(100)
  discount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
