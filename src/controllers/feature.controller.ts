import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureModel } from 'src/models/feature.model';
import { FeatureSchema } from 'src/validations/feature.schema';
import { Repository } from 'typeorm';

@Controller('/feature')
export class FeatureController {
  constructor(
    @InjectRepository(FeatureModel)
    private model: Repository<FeatureModel>,
  ) {}
  @Post()
  public async create(@Body() body: FeatureSchema): Promise<FeatureModel> {
    return this.model.save(body);
  }

  @Get()
  public async findAll(): Promise<FeatureModel[]> {
    return this.model.find();
  }

  @Get(':featureID')
  public async findOne(
    @Param('featureID') featureID: number,
  ): Promise<FeatureModel> {
    return this.model.findOne(featureID);
  }

  @Put(':featureID')
  public async update(
    @Param('featureID') featureID: number,
    @Body() body: FeatureSchema,
  ): Promise<FeatureModel> {
    const price = await this.model.findOne({ where: { featureID } });
    if (!price) {
      throw new NotFoundException(`Não existe plano com o id ${featureID}.`);
    }
    await this.model.update({ featureID }, body);

    return this.model.findOne({ where: { featureID } });
  }

  @Delete(':featureID')
  public async delete(
    @Param('featureID', ParseIntPipe) featureID: number,
  ): Promise<string> {
    const plan = await this.model.findOne({ where: { featureID } });
    if (!plan) {
      throw new NotFoundException(`Não existe preço com o id ${featureID}.`);
    }
    await this.model.softDelete(featureID);
    return `O registro com id ${featureID} foi deletado com sucesso.`;
  }
}
