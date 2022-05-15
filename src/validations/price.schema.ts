import { IsBoolean, IsInt, Max } from 'class-validator';

export class PriceSchema {
  @IsInt()
  value: number;

  @IsBoolean()
  isAnnual: boolean;

  @IsInt()
  @Max(100)
  discount: number;
}
