import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanModel } from 'src/models/plan.model';
import { PlanSchema } from 'src/validations/plan.schema';
import { PriceModel } from 'src/models/price.model';
import { FeatureModel } from 'src/models/feature.model';

@Controller('/plan')
export class PlanController {
  constructor(
    @InjectRepository(PlanModel) private model: Repository<PlanModel>,
  ) {}

  @Post()
  public async create(@Body() body: PlanSchema): Promise<PlanModel> {
    return this.model.save(body);
  }

  @Get()
  public async getAll(): Promise<PlanModel[]> {
    return this.model.find({
      relations: ['priceID', 'featureID'],
    });
  }

  @Get('/actives')
  public async getActives(): Promise<PlanModel[]> {
    const listActives = await this.model.find({ where: { planStatus: true } });
    if (!listActives) {
      throw new NotFoundException('Não existe planos ativos no momento');
    }
    return listActives;
  }

  @Get('/all-with-deleted')
  public async getAllDeleted(): Promise<PlanModel[]> {
    return this.model.find({ withDeleted: true });
  }

  @Get(':planID')
  public async getOne(
    @Param('planID', ParseIntPipe) planID: number,
  ): Promise<PlanModel> {
    const plan = await this.model.findOne(planID, {
      relations: ['priceID', 'featureID'],
    });
    if (!plan) {
      throw new NotFoundException(`Não existe plano com o id ${planID}.`);
    }
    return plan;

    // return this.model
    //   .createQueryBuilder('plan')
    //   .leftJoinAndSelect('plan.priceID', 'priceID')
    //   .leftJoinAndSelect('plan.featureID', 'featureID')
    //   .where('plan.planID = :planID', { planID: planID })
    //   .getOne();
  }

  @Put(':planID')
  public async update(
    @Param('planID', ParseIntPipe) planID: number,
    @Body() body: PlanSchema,
  ): Promise<PlanModel> {
    const plan = await this.model.findOne({ where: { planID } });
    if (!plan) {
      throw new NotFoundException(`Não existe plano com o id ${planID}.`);
    }
    await this.model.update({ planID }, body);

    return this.model.findOne({ where: { planID } });
  }

  @Put('deactivate/:planID')
  public async deactivateByplanID(
    @Param('planID', ParseIntPipe) planID: number,
  ): Promise<string> {
    const plan = await this.model.findOne(planID, {
      where: { planStatus: true },
    });
    if (!plan) {
      throw new NotFoundException(`Não existe plano ativo com o id ${planID}.`);
    }
    plan.planStatus = false;
    await this.model.update({ planID }, plan);

    return `O plano com id ${planID} foi desativado com sucesso.`;
  }

  @Put('activate/:planID')
  public async activateByplanID(
    @Param('planID', ParseIntPipe) planID: number,
  ): Promise<string> {
    const plan = await this.model.findOne(planID, {
      where: { planStatus: false },
    });
    if (!plan) {
      throw new NotFoundException(
        `Não existe plano desativado com o id ${planID}.`,
      );
    }
    plan.planStatus = true;
    await this.model.update({ planID }, plan);

    return `O plano com id ${planID} foi ativado com sucesso.`;
  }

  @Delete(':planID')
  public async delete(
    @Param('planID', ParseIntPipe) planID: number,
  ): Promise<string> {
    const plan = await this.model.findOne({ where: { planID } });
    if (!plan) {
      throw new NotFoundException(`Não existe plano com o id ${planID}.`);
    }
    await this.model.softDelete(planID);
    return `O registro com id ${planID} foi deletado com sucesso.`;
  }

  @Get('restore/:planID')
  public async restore(
    @Param('planID', ParseIntPipe) planID: number,
  ): Promise<string> {
    await this.model.restore(planID);
    return `O registro com id ${planID} foi restaurado com sucesso.`;
  }
}
