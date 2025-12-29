import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SummariesService {
    constructor(private prisma: PrismaService) { }

    async getSummary() {
        // Total asset, Asset amount
        return this.prisma.assets.findMany({
        });
    }
}
