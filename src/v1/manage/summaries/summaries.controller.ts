import { Controller, Get, UseGuards } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('manage/summaries')
export class SummariesController {
    constructor(private summaryService: SummariesService) { }

    @Get()
    async getData() {
        return this.summaryService.getSummary();
    }
}
