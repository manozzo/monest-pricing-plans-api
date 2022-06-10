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
  priceID: number;

  @ManyToOne(() => PriceModel, (price) => price.priceID)
  price: PriceModel;

  @Column()
  featureID: number;

  @ManyToOne(() => FeatureModel, (feature) => feature.featureID)
  feature: FeatureModel;

  @Column()
  planStatus: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
