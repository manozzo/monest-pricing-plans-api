import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceModel } from 'src/models/price.model';
import { PriceController } from '../controllers/price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriceModel])],
  controllers: [PriceController],
})
export class PriceModule {}
