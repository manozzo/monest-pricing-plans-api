import { IsInt, IsOptional, IsString } from 'class-validator';

export class FeatureSchema {
  @IsInt()
  @IsOptional()
  repositories: number;

  @IsInt()
  @IsOptional()
  members: number;

  @IsInt()
  storageCapacity: number;

  @IsString()
  @IsOptional()
  description: string;
}
