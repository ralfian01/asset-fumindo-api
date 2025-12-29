import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetsService } from './assets.service';
import { AssetQueryDto } from './dto/asset-query.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('manage/assets')
export class AssetsController {
    constructor(private assetService: AssetsService) { }

    @Post()
    create(@Body() dto: CreateAssetDto) {
        return this.assetService.create(dto);
    }

    @Get()
    findAll(@Query() query: AssetQueryDto) {
        return this.assetService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.assetService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() dto: UpdateAssetDto,
    ) {
        return this.assetService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.assetService.remove(id);
    }
}
