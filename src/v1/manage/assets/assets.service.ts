import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreateAssetDto) {
        return this.prisma.assets.create({
            data: dto,
        });
    }

    async findAll(filters: {
        category?: string;
        keyword?: string;
    }) {
        const where: any = {};

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.keyword) {
            where.asset_name = {
                contains: filters.keyword,
                mode: 'insensitive',
            };
        }

        return this.prisma.assets.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }


    async findOne(id: number) {
        const asset = await this.prisma.assets.findUnique({
            where: { asset_id: id },
        });

        if (!asset) {
            throw new NotFoundException('Asset not found');
        }

        return asset;
    }

    async update(id: number, dto: UpdateAssetDto) {
        await this.findOne(id);

        return this.prisma.assets.update({
            where: { asset_id: id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.assets.delete({
            where: { asset_id: id },
        });
    }
}
