import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AssetCategory } from './create-asset.dto';

export class AssetQueryDto {
    @IsOptional()
    @IsEnum(AssetCategory)
    category?: AssetCategory;

    @IsOptional()
    @IsString()
    keyword?: string;
}
