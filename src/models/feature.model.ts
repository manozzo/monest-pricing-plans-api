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
  @OneToMany(() => PlanModel, (featureID) => featureID.featureID)
  featureID: number;

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
