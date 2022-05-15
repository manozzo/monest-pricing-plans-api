import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { FeatureModel } from './feature.model';
import { PriceModel } from './price.model';

@Entity()
export class PlanModel {
  @PrimaryGeneratedColumn()
  planID: number;

  @Column()
  name: string;

  @Column()
  bestPlan: boolean;

  @Column()
  @ManyToOne(() => PriceModel, (priceID) => priceID.priceID)
  priceID: number;

  @Column()
  @ManyToOne(() => FeatureModel, (featureID) => featureID.featureID)
  featureID: number;

  @Column()
  planStatus: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
