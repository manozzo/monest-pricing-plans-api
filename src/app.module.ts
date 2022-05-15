import { Module } from '@nestjs/common';
import { PlanModule } from './modules/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceModule } from './modules/price.module';
import { FeatureModule } from './modules/feature.module';
import { PlanModel } from './models/plan.model';
import { PriceModel } from './models/price.model';
import { FeatureModel } from './models/feature.model';

@Module({
  imports: [
    PlanModule,
    PriceModule,
    FeatureModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([PlanModel, PriceModel, FeatureModel]),
  ],
})
export class AppModule {}
