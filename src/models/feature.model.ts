import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { PlanModel } from './plan.model';

@Entity()
export class FeatureModel {
  @PrimaryGeneratedColumn()
  featureID: number;

  @OneToMany(() => PlanModel, (plan) => plan.featureID)
  plans: PlanModel[];

  @Column({ nullable: true })
  repositories: number;

  @Column({ nullable: true })
  members: number;

  @Column()
  storageCapacity: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
