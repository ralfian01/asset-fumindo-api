import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { PrismaService } from 'prisma/prisma.service';
import { SummariesController } from './summaries.controller';

@Module({
  controllers: [SummariesController],
  providers: [SummariesService, PrismaService]
})
export class SummariesModule { }
