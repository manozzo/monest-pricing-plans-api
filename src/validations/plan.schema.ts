import {
  IsString,
  IsInt,
  IsBoolean,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class PlanSchema {
  @IsString()
  @MaxLength(25)
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  bestPlan: boolean;

  @IsInt()
  @IsOptional()
  priceID: number;

  @IsInt()
  @IsOptional()
  featureID: number;

  @IsBoolean()
  @IsOptional()
  planStatus: boolean;
}
