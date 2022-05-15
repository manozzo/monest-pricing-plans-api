import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceModel } from 'src/models/price.model';
import { PriceSchema } from 'src/validations/price.schema';
import { Repository } from 'typeorm';

@Controller('/price')
export class PriceController {
  constructor(
    @InjectRepository(PriceModel) private model: Repository<PriceModel>,
  ) {}

  @Post()
  public async create(@Body() body: PriceSchema): Promise<PriceModel> {
    return this.model.save(body);
  }

  @Get()
  public async findAll(): Promise<PriceModel[]> {
    return this.model.find();
  }

  @Get(':priceID')
  public async findOne(@Param('priceID') priceID: number): Promise<PriceModel> {
    return this.model.findOne(priceID);
  }

  @Put(':priceID')
  public async update(
    @Param('priceID') priceID: number,
    @Body() body: PriceSchema,
  ): Promise<PriceModel> {
    const price = await this.model.findOne({ where: { priceID } });
    if (!price) {
      throw new NotFoundException(`Não existe plano com o id ${priceID}.`);
    }
    await this.model.update({ priceID }, body);

    return this.model.findOne({ where: { priceID } });
  }

  @Delete(':priceID')
  public async delete(
    @Param('priceID', ParseIntPipe) priceID: number,
  ): Promise<string> {
    const plan = await this.model.findOne({ where: { priceID } });
    if (!plan) {
      throw new NotFoundException(`Não existe preço com o id ${priceID}.`);
    }
    await this.model.softDelete(priceID);
    return `O registro com id ${priceID} foi deletado com sucesso.`;
  }
}
