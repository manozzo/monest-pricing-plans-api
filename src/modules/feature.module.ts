import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureModel } from 'src/models/feature.model';
import { FeatureController } from '../controllers/feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureModel])],
  controllers: [FeatureController],
})
export class FeatureModule {}
