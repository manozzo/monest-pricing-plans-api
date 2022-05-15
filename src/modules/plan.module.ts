import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanController } from 'src/controllers/plan.controller';
import { PlanModel } from 'src/models/plan.model';

@Module({
  imports: [TypeOrmModule.forFeature([PlanModel])],
  controllers: [PlanController],
})
export class PlanModule {}
