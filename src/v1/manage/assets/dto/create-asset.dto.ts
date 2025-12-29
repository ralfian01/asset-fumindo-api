import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export enum AssetCategory {
    CONSUMABLES = 'CONSUMABLES',
    NON_CONSUMABLES = 'NON_CONSUMABLES',
}

export class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    asset_name: string;

    @IsInt()
    @Min(0)
    stock_quantity: number;

    @IsEnum(AssetCategory)
    category: AssetCategory;
}
