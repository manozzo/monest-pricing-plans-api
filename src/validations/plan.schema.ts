import { IsString, IsInt, IsBoolean, MaxLength } from 'class-validator';

export class PlanSchema {
  @IsString()
  @MaxLength(25)
  name: string;

  @IsBoolean()
  bestPlan: boolean;

  @IsInt()
  priceID: number;

  @IsInt()
  featureID: number;

  @IsBoolean()
  planStatus: boolean;
}
